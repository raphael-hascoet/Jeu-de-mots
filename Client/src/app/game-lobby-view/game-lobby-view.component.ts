import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../service/game.service';
import { AppComponent } from '../app.component';
import { Player } from '../model/player/player';

@Component({
  selector: 'app-game-lobby-view',
  templateUrl: './game-lobby-view.component.html',
  styleUrls: ['./game-lobby-view.component.css']
})
export class GameLobbyViewComponent implements OnInit {
  @Input() parent: AppComponent;
  @Input() playerName : string;

  players : Array<Player>;

  constructor(private gameService : GameService) { }

  ngOnInit() {
    this.gameService.getConnectedPlayers().subscribe(players => this.players = players);
  }

}
