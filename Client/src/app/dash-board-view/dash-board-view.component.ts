import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { GameService } from '../service/game.service';

@Component({
    selector: 'app-dash-board-view',
    templateUrl: './dash-board-view.component.html',
    styleUrls: ['./dash-board-view.component.css'],
})
export class DashBoardViewComponent implements OnInit {
    @Input() parent: AppComponent;

    hostIsConnected : boolean;

    constructor(private gameService: GameService) {}

    ngOnInit() {
        this.gameService.getHostIsConnected().subscribe(value => this.hostIsConnected = value);
    }

    goToGameConfig(userName : string): void {
        this.gameService.connectHost(userName);
        this.parent.setUserName(userName);
        this.parent.changeViewToGameConfig();
    }

    goToGameLobby(userName: string){
        this.gameService.connectPlayer(userName);
        this.parent.setUserName(userName);
        this.parent.changeViewToGameLobby();
    }
}
