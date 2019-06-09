import { Player } from "./Player";

export class Lobby{

    private static instance: Lobby;

    static createLobby(hostName: string){
        this.instance = new Lobby(new Player(hostName));
    }

    static getInstance(): Lobby {
        return this.instance;
    }

    static hostIsConnected(): boolean {
        return Lobby.instance && Lobby.getInstance().getHost().getName().localeCompare('')!=0;
    }

    private players: Player[];
    private host: Player;

    constructor(host: Player){
        this.host = host
        this.players = Array<Player>(this.host);
    }

    getHost(){
        return this.host;
    }

    getPlayers(){
        return this.players;
    }
}