import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GameConfig } from '../model/game-config/game-config';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    private userName: string;

    maxDifficulty = this.socket.fromEvent<number>('maxDifficulty');
    minDifficulty = this.socket.fromEvent<number>('minDifficulty');

    constructor(private socket: Socket) {}

    /**
     * Création d'une partie
     *
     * @param config nom de l'host, nom de l'équipe et niveau de difficulté sélectionné
     */
    createGame(config: GameConfig) {
        this.socket.emit('startGame', config);
    }

    getMaxDifficulty(): Observable<number> {
        this.socket.emit('getMaximalDifficulty');
        return this.maxDifficulty;
    }

    getMinDifficulty(): Observable<number> {
        this.socket.emit('getMinimalDifficulty');
        return this.minDifficulty;
    }

    /**
     * Réception du score du dernoer mot proposé
     */
    getScore() {
        return this.socket.fromEvent('score');
    }

    /**
     * Envois d'une proposition de mot
     *
     * @param msg mot proposé
     */
    sendProposition(msg: string) {
        this.socket.emit('proposition', msg);
    }

    /**
     * Demande de Récupération des meilleurs mots proposés
     */
    askForWords() {
        this.socket.emit('getWords');
    }

    /**
     * Récupération des meilleurs mots proposés
     */
    getWords() {
        return this.socket.fromEvent('words');
    }

    /**
     * Récupération de l'event de fin de partie
     */
    hasWon() {
        return this.socket.fromEvent('fin');
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

    setUserName(userName: string): void {
        this.userName = userName;
    }

    getUserName(): string {
        return this.userName;
    }

    getNbLettres() {
        return this.socket.fromEvent('nbLetters');
    }

    getChronologie() {
        return this.socket.fromEvent('chronology');
    }

    getGameStats() {
        return this.socket.fromEvent('gameStats');
    }
}
