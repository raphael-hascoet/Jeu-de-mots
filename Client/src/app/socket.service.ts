import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    constructor(public socket: Socket) {}

    getScore() {
        return this.socket.fromEvent('score');
    }

    sendProposition(msg: string) {
        this.socket.emit('proposition', msg);
    }

    askForWords() {
        this.socket.emit('getWords');
    }

    getWords() {
        console.log('words');
        return this.socket.fromEvent('words');
    }
}
