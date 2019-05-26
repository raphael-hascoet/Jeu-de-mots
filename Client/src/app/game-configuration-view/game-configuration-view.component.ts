import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../service/game.service';
import { GameConfig } from "../model/game-config/game-config";
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-game-configuration-view',
  templateUrl: './game-configuration-view.component.html',
  styleUrls: ['./game-configuration-view.component.css']
})
export class GameConfigurationViewComponent implements OnInit {

  @Input() parent: AppComponent;

  maxDifficulty : number;
  minDifficulty : number;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getMinDifficulty().subscribe(value => this.minDifficulty=value);
    this.gameService.getMaxDifficulty().subscribe(value => this.maxDifficulty=value);

    console.log(this.parent);

  }

  createGame(hostName : string, hostTeam : string, gameDifficulty : number) : void{
    this.gameService.createGame(new GameConfig(hostName, hostTeam, gameDifficulty));
  }

  changeViewToGame(){
    this.parent.changeViewToGame();
  }

  getMinDifficulty(): number{
    return this.minDifficulty;
  }

  getMaxDifficulty(): number{
    return this.maxDifficulty; 
  }

}
