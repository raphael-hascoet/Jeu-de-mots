import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GameConfig } from '../model/game-config/game-config';
import { Observable } from 'rxjs';
import { Player } from '../model/player/player';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    
    maxDifficulty: Observable<number> = this.socket.fromEvent<number>('maxDifficulty');
    minDifficulty: Observable<number> = this.socket.fromEvent<number>('minDifficulty');
    hostIsConnected: Observable<boolean> = this.socket.fromEvent<boolean>('hostIsConnected');
    connectedPlayers: Observable<Player[]> = this.socket.fromEvent<Player[]>('connectedPlayers');
    valueUserIsHost: Observable<boolean> = this.socket.fromEvent<boolean>('userIsHost');
    teamName : Observable<string> = this.socket.fromEvent<string>('teamName');
    gameDifficulty: Observable<number> = this.socket.fromEvent<number>('gameDifficulty');

    constructor(private socket: Socket) {}

    /**
     * Le premier utilisateur à ce connecter deviens l'host, cette méthode permet d'envoyer le nom de l'host au serveur
     * et d'initialiser la configuration de la partie
     *
     * @param hostname nom de l'host
     */
    connectUser(hostname: string): void {
        this.socket.emit('connectUser', hostname);
    }

    /**
     * Cette méthode revoie True si l'utilisateur connecté sur cette socket est l'host de la partie
     * False sinon
     */
    userIsHost(): Observable<boolean> {
        this.socket.emit('isUserHost');
        return this.valueUserIsHost;
    }

    getHostIsConnected(): Observable<boolean> {
        this.socket.emit('getHostIsConnected');
        return this.hostIsConnected;
    }

    getConnectedPlayers(): Observable<Player[]> {
        this.socket.emit('getConnectedPlayers');
        return this.connectedPlayers;
    }

    updateTeamName(teamName: string): void {
        this.socket.emit('updateTeamName', teamName);
    }

    getTeamName() : Observable<string>{
        this.socket.emit('getTeamName');
        return this.teamName;
    }

    updateGameDifficulty(gameDifficulty: number): void {
        this.socket.emit('updateGameDifficulty', gameDifficulty);
    }

    getGameDifficulty() {
        this.socket.emit('getGameDifficulty');
        return this.gameDifficulty;
    }

    /**
     * Création d'une partie
     *
     * @param config nom de l'host, nom de l'équipe et niveau de difficulté sélectionné
     */
    createGame(config: GameConfig): void {
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
}
