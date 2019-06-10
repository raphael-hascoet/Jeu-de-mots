import { GameService } from './../service/game.service';
import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../service/routing.service';

@Component({
    selector: 'app-dash-board-view',
    templateUrl: './dash-board-view.component.html',
    styleUrls: ['./dash-board-view.component.css'],
})
export class DashBoardViewComponent implements OnInit {
    constructor(
        private gameService: GameService,
        private routingService: RoutingService
    ) {}

    ngOnInit() {}

    goToGameConfig(userName: string): void {
        this.gameService.setUserName(userName);
        this.routingService.changeViewToGameConfig();
    }
}
