import { Component, OnInit } from '@angular/core';
import { Player } from '../model/player/player';
import { GameService } from '../service/game.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-players-list',
    templateUrl: './players-list.component.html',
    styleUrls: ['./players-list.component.css'],
})
export class PlayersListComponent implements OnInit {
    private connectedPlayersSubscription: Subscription;

    host: Player;
    players: Player[];

    constructor(private gameService: GameService) {}

    ngOnInit() {
        this.connectedPlayersSubscription = this.gameService
            .getConnectedPlayers()
            .subscribe(playersObj => {
                console.log(playersObj['host']);
                if (!!playersObj['host']) {
                    this.host = playersObj['host'];
                    this.players = playersObj['players'];
                } else {
                    this.players = playersObj as Player[];
                }
            });
    }

    ngOnDestroy() {
        this.connectedPlayersSubscription.unsubscribe();
    }
}
