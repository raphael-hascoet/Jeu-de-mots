import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GameService } from '../service/game.service';
import { RoutingService } from '../service/routing.service';
import { MatDialog } from '@angular/material';
import { HostDisconnectedDialogComponent } from '../host-disconnected-dialog/host-disconnected-dialog.component';

@Component({
    selector: 'app-game-view',
    templateUrl: './game-view.component.html',
    styleUrls: ['./game-view.component.css'],
})
export class GameViewComponent implements OnInit {
    title = 'app';
    incomingmsg = [];
    msg = 'First Protocol';

    teamName : string;
    gameDifficulty : number;
    @ViewChild('box') input: ElementRef;

    @ViewChild('response') response: ElementRef;
    constructor(private gameService: GameService, private routingService : RoutingService, private hostDisconnectedDialog : MatDialog) {}

    ngOnInit() {
        if(!this.gameService.getUserName() || this.gameService.getUserName().localeCompare('')==0){
            this.routingService.changeViewToDashboard();
            return;
        }

        this.gameService.getScore().subscribe(msg => {
            this.response.nativeElement.value =
                msg[0] +
                ' : ' +
                msg[1] +
                ' , ' +
                msg[2] +
                '\n' +
                this.response.nativeElement.value;
        });

        this.gameService.hasWon().subscribe(msg => {
            this.response.nativeElement.value =
                'Gagné ! ' + '\n' + this.response.nativeElement.value;
        });

        this.gameService.getTeamName().subscribe(value => this.teamName = value);
        this.gameService.getGameDifficulty().subscribe(value => this.gameDifficulty = value);

        this.gameService.getHostIsConnected().subscribe(hostIsConnected => {
            if(!hostIsConnected){
                const dialogRef = this.hostDisconnectedDialog.open(HostDisconnectedDialogComponent);
                dialogRef.afterClosed().subscribe(result => {
                    this.hostDisconnectedDialog.closeAll();
                    this.routingService.changeViewToDashboard();
                });
            }
        });
    }

    sendProposition(proposition) {
        this.gameService.sendProposition(proposition);
    }

    value = '';
    enterValue(value: string) {
        this.value = value;
        this.input.nativeElement.value = '';
        //Check pour les string vide
        if (value.replace(/\s/g, '').length != 0) {
            this.sendProposition(value);
        }
    }
}
