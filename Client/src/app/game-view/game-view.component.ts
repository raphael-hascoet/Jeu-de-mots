import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AppComponent } from '../app.component';
import { GameService } from '../service/game.service';

@Component({
    selector: 'app-game-view',
    templateUrl: './game-view.component.html',
    styleUrls: ['./game-view.component.css'],
})
export class GameViewComponent implements OnInit {
    title = 'app';
    incomingmsg = [];
    msg = 'First Protocol';
    @ViewChild('box') input: ElementRef;

    @ViewChild('response') response: ElementRef;
    /**
     * Element HTML du Timer
     */
    @ViewChild('timer') timer: ElementRef;

    constructor(private gameService: GameService) {}

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
        });

        this.gameService.getTime().subscribe(msg => {
            console.log(msg);
            let seconds = msg[0]['seconds'];
            let minutes = msg[0]['minutes'];
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
