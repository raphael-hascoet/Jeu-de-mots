import { Component, OnInit } from '@angular/core';
import { Player } from '../model/player/player';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {

  players : Player[];

  constructor(private gameService : GameService) { }

  ngOnInit() {

    console.log('getPlayers');
    this.gameService.getConnectedPlayers().subscribe(players =>{
      this.players = players
      console.log('connected players : ');
      for(let player of this.players){
        console.log(player.name);
      }
    } );

    
  }

}
