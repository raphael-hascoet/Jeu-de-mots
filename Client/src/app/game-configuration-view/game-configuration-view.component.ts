import { Component, OnInit, Input, NgZone } from '@angular/core';
import { GameService } from '../service/game.service';
import { GameConfig } from '../model/game-config/game-config';
import { AppComponent } from '../app.component';
import { FormControl, Validators } from '@angular/forms';
import { Player } from '../model/player/player';

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
    @Input() parent: AppComponent;
    @Input() userName: string;

    userIsHost: boolean;

    localIp: string =
        sessionStorage.getItem('LOCAL_IP') + ':' + window.location.port;

    maxDifficulty: number;
    minDifficulty: number;

    players : Player[];

    difficultyFormControl: FormControl = new FormControl(1, [Validators.required]);

    constructor(private gameService: GameService, private zone: NgZone) {}

    ngOnInit() {
        this.gameService.userIsHost().subscribe(value => this.userIsHost = value);
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

        this.gameService.getConnectedPlayers().subscribe(players => this.players = players);
    }

    createGame(
        hostTeam: string,
        gameDifficulty: number
    ): void {
        this.gameService.createGame(
            new GameConfig(this.userName, hostTeam, gameDifficulty)
        );

        this.changeViewToGame();
    }

    changeViewToGame() {
        this.parent.changeViewToGame();
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
