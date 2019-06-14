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
