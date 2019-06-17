import { Component, OnInit } from '@angular/core';
import { Player } from '../model/player/player';
import { GameService } from '../service/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {
  private connectedPlayersSubscription: Subscription;

  players : Player[];

  constructor(private gameService : GameService) { }

  ngOnInit() {
    this.connectedPlayersSubscription = this.gameService.getConnectedPlayers().subscribe(players =>{
      this.players = players;
    });
  }

  ngOnDestroy(){
    this.connectedPlayersSubscription.unsubscribe();
  }

}
