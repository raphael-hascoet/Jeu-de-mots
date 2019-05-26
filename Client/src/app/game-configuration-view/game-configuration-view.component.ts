import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { GameConfig } from "../model/game-config/game-config";

@Component({
  selector: 'app-game-configuration-view',
  templateUrl: './game-configuration-view.component.html',
  styleUrls: ['./game-configuration-view.component.css']
})
export class GameConfigurationViewComponent implements OnInit {
  maxDifficulty : number;
  minDifficulty : number;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getMinDifficulty().subscribe(value => this.minDifficulty=value);
    this.gameService.getMaxDifficulty().subscribe(value => this.maxDifficulty=value);
  }

  createGame(hostName : string, hostTeam : string, gameDifficulty : number) : void{
    this.gameService.createGame(new GameConfig(hostName, hostTeam, gameDifficulty));
  }

  getMinDifficulty(): number{
    return this.minDifficulty;
  }

  getMaxDifficulty(): number{
    return this.maxDifficulty; 
  }

}
