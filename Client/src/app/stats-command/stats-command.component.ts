import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { RoutingService } from '../service/routing.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-stats-command',
    templateUrl: './stats-command.component.html',
    styleUrls: ['./stats-command.component.css'],
})
export class StatsCommandComponent implements OnInit {
    private replayGameSubscription: Subscription;
    private gameDifficultySubscription: Subscription;
    constructor(
        private gameService: GameService,
        private routingService: RoutingService
    ) {}

    ngOnInit() {
        this.replayGameSubscription = this.gameService
            .replayGame()
            .subscribe(msg => {
                console.log('Rejouer!!');

                this.changeViewToGame();
            });
    }

    replayGame() {
        this.gameDifficultySubscription = this.gameService
            .getGameDifficulty()
            .subscribe(value => {
                let difficulty: number;
                difficulty = +value;
                difficulty = difficulty + 1;
                console.log('Nouvelle difficultée', difficulty);
                this.gameService.replay(difficulty);
            });
    }

    endGame() {}

    changeViewToGame() {
        this.routingService.changeViewToGame();
    }

    ngOnDestroy() {
        if (this.gameDifficultySubscription) {
            this.gameDifficultySubscription.unsubscribe();
        }
        this.replayGameSubscription.unsubscribe();
    }
}
