import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GameConfig } from '../model/game-config/game-config';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  currentDocument = this.socket.fromEvent<GameConfig>('configuration');
  documents = this.socket.fromEvent<string[]>('configuration');

  constructor(private socket: Socket) { }

  createGame(config : GameConfig){
    this.socket.emit('startGame', config);
  }
}
