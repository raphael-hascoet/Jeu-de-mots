import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GameConfig } from '../model/game-config/game-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  maxDifficulty = this.socket.fromEvent<number>('maxDifficulty');
  minDifficulty = this.socket.fromEvent<number>('minDifficulty');

  constructor(private socket: Socket) { }

  createGame(config : GameConfig){
    this.socket.emit('startGame', config);
  }

  getMaxDifficulty() : Observable<number>{

    this.socket.emit('getMaximalDifficulty');
    return this.maxDifficulty;
  }

  getMinDifficulty() : Observable<number>{

    this.socket.emit('getMinimalDifficulty');
    return this.minDifficulty;
  }
}
