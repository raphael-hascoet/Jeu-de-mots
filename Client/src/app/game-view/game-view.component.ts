import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GameService } from '../service/game.service';
import { RoutingService } from './../service/routing.service';

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
    constructor(
        private gameService: GameService,
        private routingService: RoutingService
    ) {}
    /**
     * Element HTML du Timer
     */
    @ViewChild('timer') timer: ElementRef;


    ngOnInit() {
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
            this.changeViewToGameStats();
        });

        this.gameService.getTeamName().subscribe(value => this.teamName = value);
        this.gameService.getGameDifficulty().subscribe(value => this.gameDifficulty = value);
        this.startTimer();
    }

    /**
     * Méthode permettant de démarrer le chronomètre de jeu
     */
    private startTimer() {
        let seconds = 0;
        let minutes = 0;
        this.gameService.askTimer();
        this.gameService.getTime().subscribe(msg => {
            console.log(msg);
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
