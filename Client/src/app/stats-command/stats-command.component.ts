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
    private subscriptionUserIsHost: Subscription;
    private getAnswerubscription: Subscription;

    constructor(
        private gameService: GameService,
        private routingService: RoutingService
    ) {}

    ngOnInit() {
        this.replayGameSubscription = this.gameService
            .replayGame()
            .subscribe(msg => {
                this.changeViewToGame();
            });

        this.getAnswerubscription = this.gameService
            .getAnswer()
            .subscribe(msg => {
                this.changeViewToConfig();
            });
    }

    replayGame() {
        this.gameDifficultySubscription = this.gameService
            .getGameDifficulty()
            .subscribe(value => {
                let difficulty: number;
                difficulty = +value;
                difficulty = difficulty + 1;
                this.gameService.replay(difficulty);
            });
    }

    endGame() {
        this.gameService.surrenderGame();
        this.subscriptionUserIsHost = this.gameService
            .userIsHost()
            .subscribe(userIsHost => {
                if (userIsHost) {
                    this.gameService.askForAnswer();
                } else {
                    this.gameService.setUserName('');
                    this.routingService.changeViewToDashboard();
                }
            });
    }

    changeViewToGame() {
        this.routingService.changeViewToGame();
    }

    changeViewToConfig() {
        this.routingService.changeViewToGameConfig();
    }

    ngOnDestroy() {
        if (this.gameDifficultySubscription) {
            this.gameDifficultySubscription.unsubscribe();
        }
        if (this.subscriptionUserIsHost) {
            this.subscriptionUserIsHost.unsubscribe();
        }
        if (this.getAnswerubscription) {
            this.getAnswerubscription.unsubscribe();
        }
        this.replayGameSubscription.unsubscribe();
    }
}
