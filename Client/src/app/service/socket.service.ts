import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import TsMap from 'ts-map';

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

    /**
     * Méthode permettant de demander la liste des meilleurs mots proposés par les joueurs au serveur
     */
    askForWords() {
        this.socket.emit('getWords');
    }

    /**
     * Méthode permettant de traiter le retour de la liste des meilleurs mots proposés par les joueurs
     */
    getWords() {
        return this.socket.fromEvent('words');
    }

    /**
     * Méthode permettant de demander au serveur la réponse qu'il fallait trouver
     */
    askForAnswer() {
        this.socket.emit('getAnswer');
    }

    /**
     * Méthode permettant de traiter la réception du mot à trouver par les joueurs
     */
    getAnswer() {
        return this.socket.fromEvent('answer');
    }

    hasWon() {
        return this.socket.fromEvent('fin');
    }
}
