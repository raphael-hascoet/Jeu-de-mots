import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { GameConfig } from "../model/game-config/game-config";

@Component({
  selector: 'app-game-configuration-view',
  templateUrl: './game-configuration-view.component.html',
  styleUrls: ['./game-configuration-view.component.css']
})
export class GameConfigurationViewComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  createGame(hostName : string, hostTeam : string, gameDifficulty : number) : void{
    this.gameService.createGame(new GameConfig(hostName, hostTeam, gameDifficulty));
  }

}
