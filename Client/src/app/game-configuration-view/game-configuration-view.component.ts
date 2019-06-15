import { RoutingService } from './../service/routing.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { GameService } from '../service/game.service';
import { GameConfig } from '../model/game-config/game-config';
import { FormControl, Validators } from '@angular/forms';
import { HostDisconnectedDialogComponent } from '../host-disconnected-dialog/host-disconnected-dialog.component';
import { MatDialog } from '@angular/material';

declare global {
    interface Window {
        RTCPeerConnection: RTCPeerConnection;
        mozRTCPeerConnection: RTCPeerConnection;
        webkitRTCPeerConnection: RTCPeerConnection;
    }
}

@Component({
    selector: 'app-game-configuration-view',
    templateUrl: './game-configuration-view.component.html',
    styleUrls: ['./game-configuration-view.component.css'],
})
export class GameConfigurationViewComponent implements OnInit {
    userName: string;

    userIsHost: boolean = false;

    localIp: string =
        sessionStorage.getItem('LOCAL_IP') + ':' + window.location.port;

    maxDifficulty: number;
    minDifficulty: number;

    constructor(
        private gameService: GameService,
        private routingService: RoutingService,
        private zone: NgZone,
        private hostDisconnectedDialog : MatDialog
    ) {}
    difficultyFormControl: FormControl = new FormControl(1, [Validators.required]);

    gameDifficultyValue : number = 1;
    teamNameValue : string = "";

    ngOnInit() {
        if(!this.gameService.getUserName()){
            this.routingService.changeViewToDashboard();
            return;
        } 

        this.userName = this.gameService.getUserName();

        this.gameService.userIsHost().subscribe(value => {
            this.userIsHost = value;
        });
        this.gameService.connectUser(this.userName);
        this.determineLocalIp();
        this.gameService.getMinDifficulty().subscribe(value => {
            this.minDifficulty = value;
            this.difficultyFormControl.setValidators([
                Validators.required,
                Validators.min(this.minDifficulty),
                Validators.max(this.maxDifficulty),
            ]);
        });
        this.gameService.getMaxDifficulty().subscribe(value => {
            this.maxDifficulty = value;
            this.difficultyFormControl.setValidators([
                Validators.required,
                Validators.min(this.minDifficulty),
                Validators.max(this.maxDifficulty),
            ]);
        });
        this.gameService.getTeamName().subscribe(value => this.teamNameValue = value);
        this.gameService.getGameDifficulty().subscribe(value => {
            this.gameDifficultyValue = value;
        });

        this.gameService.getGameIsLaunched().subscribe(gameIsLaunched =>{
            if(gameIsLaunched){
                this.changeViewToGame();
            }
        });
        this.gameService.getHostIsConnected().subscribe(hostIsConnected => {
            if(!hostIsConnected){
                this.routingService.changeViewToDashboard();
                const dialogRef = this.hostDisconnectedDialog.open(HostDisconnectedDialogComponent);
                dialogRef.afterClosed().subscribe(result => {
                    this.hostDisconnectedDialog.closeAll();
                    this.routingService.changeViewToDashboard();
                });
            }
        });
    }

    updateTeamName(teamName: string){
        this.gameService.updateTeamName(teamName);
    }

    updateGameDifficulty(gameDifficulty : number){
        this.gameService.updateGameDifficulty(gameDifficulty);
    }

    createGame(
        hostTeam: string,
        gameDifficulty: number
    ): void {
        this.gameService.createGame(
            new GameConfig(this.userName, hostTeam, gameDifficulty)
        );
    }

    changeViewToGame() {
        this.routingService.changeViewToGame();
    }

    getMinDifficulty(): number {
        return this.minDifficulty;
    }

    getMaxDifficulty(): number {
        return this.maxDifficulty;
    }

    /**
     * Récupération de l'ip local
     */

    private ipRegex = new RegExp(
        /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
    );

    private determineLocalIp() {
        window.RTCPeerConnection = this.getRTCPeerConnection();

        const pc = new RTCPeerConnection({ iceServers: [] });
        pc.createDataChannel('');
        pc.createOffer().then(pc.setLocalDescription.bind(pc));

        pc.onicecandidate = ice => {
            this.zone.run(() => {
                if (!ice || !ice.candidate || !ice.candidate.candidate) {
                    return;
                }

                this.localIp =
                    this.ipRegex.exec(ice.candidate.candidate)[1] +
                    ':' +
                    window.location.port;
                sessionStorage.setItem('LOCAL_IP', this.localIp);

                pc.onicecandidate = () => {};
                pc.close();
            });
        };
    }

    private getRTCPeerConnection() {
        return (
            window.RTCPeerConnection ||
            window.mozRTCPeerConnection ||
            window.webkitRTCPeerConnection
        );
    }
}
