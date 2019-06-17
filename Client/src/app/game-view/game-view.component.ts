import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GameService } from '../service/game.service';
import { RoutingService } from '../service/routing.service';
import { MatDialog } from '@angular/material';
import { HostDisconnectedDialogComponent } from '../host-disconnected-dialog/host-disconnected-dialog.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-game-view',
    templateUrl: './game-view.component.html',
    styleUrls: ['./game-view.component.css'],
})
export class GameViewComponent implements OnInit {
    /**
     * Liste des subscriptions, a unsubscribe dans le ngOnDestroy
     */
    private scoreSubscription: Subscription;
    private hasWonSubscription: Subscription;
    private teamNameSubscription: Subscription;
    private gameDifficultySubscription: Subscription;
    private hostIsConnectedSubscription: Subscription;
    private timeSubscription: Subscription;

    title = 'app';
    incomingmsg = [];
    msg = 'First Protocol';

    teamName: string;
    gameDifficulty: number;
    @ViewChild('box') input: ElementRef;

    @ViewChild('response') response: ElementRef;

    /**
     * Element HTML du Timer
     */
    @ViewChild('timer') timer: ElementRef;
    constructor(
        private gameService: GameService,
        private routingService: RoutingService,
        private hostDisconnectedDialog: MatDialog
    ) {}

    ngOnInit() {
        if (
            !this.gameService.getUserName() ||
            this.gameService.getUserName().localeCompare('') == 0
        ) {
            this.routingService.changeViewToDashboard();
            return;
        }

        this.scoreSubscription = this.gameService.getScore().subscribe(msg => {
            this.response.nativeElement.value =
                msg[0] +
                ' : ' +
                msg[1] +
                ' , ' +
                msg[2] +
                '\n' +
                this.response.nativeElement.value;
        });

        this.hasWonSubscription = this.gameService.hasWon().subscribe(msg => {
            this.response.nativeElement.value =
                'Gagné ! ' + '\n' + this.response.nativeElement.value;
            console.log('passer vu stats');

            this.changeViewToGameStats();
        });

        this.teamNameSubscription = this.gameService
            .getTeamName()
            .subscribe(value => (this.teamName = value));
        this.gameDifficultySubscription = this.gameService
            .getGameDifficulty()
            .subscribe(value => (this.gameDifficulty = value));

        this.hostIsConnectedSubscription = this.gameService
            .getHostIsConnected()
            .subscribe(hostIsConnected => {
                if (!hostIsConnected) {
                    const dialogRef = this.hostDisconnectedDialog.open(
                        HostDisconnectedDialogComponent
                    );
                    dialogRef.afterClosed().subscribe(result => {
                        this.hostDisconnectedDialog.closeAll();
                        this.routingService.changeViewToDashboard();
                    });
                }
            });
        this.startTimer();
    }

    ngOnDestroy() {
        this.scoreSubscription.unsubscribe();
        this.hasWonSubscription.unsubscribe();
        this.teamNameSubscription.unsubscribe();
        this.gameDifficultySubscription.unsubscribe();
        this.hostIsConnectedSubscription.unsubscribe();
        this.timeSubscription.unsubscribe();
    }

    /**
     * Méthode permettant de démarrer le chronomètre de jeu
     */
    private startTimer() {
        let seconds = 0;
        let minutes = 0;
        this.gameService.askTimer();
        this.timeSubscription = this.gameService.getTime().subscribe(msg => {
            seconds = msg[0]['seconds'];
            minutes = msg[0]['minutes'];
            setInterval(() => {
                seconds++;
                if (seconds == 60) {
                    minutes++;
                    seconds = 0;
                }
                let text = 'Temps passé à jouer : ';
                let timerMin = '';
                let timerSec = seconds + ' secondes';
                if (minutes > 0) {
                    if (minutes == 1) {
                        timerMin = minutes + ' minute ';
                    } else {
                        timerMin = minutes + ' minutes ';
                    }
                }
                if (seconds <= 1) {
                    timerSec = seconds + ' seconde';
                }
                this.timer.nativeElement.value = text + timerMin + timerSec;
            }, 1000);
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

    changeViewToGameStats() {
        this.routingService.changeViewToGameStats();
    }
}
