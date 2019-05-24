import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    constructor(public socket: Socket) {}

    getMessage() {
        return this.socket.fromEvent('msg');
    }

    sendMessage(msg: string) {
        this.socket.emit('msg', msg);
    }
}
