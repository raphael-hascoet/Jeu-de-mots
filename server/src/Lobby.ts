import { Player } from "./Player";

export class Lobby{
    
    private static instance: Lobby;

    static createLobby(hostName: string){
        this.instance = new Lobby(new Player(hostName));
    }

    static getInstance(): Lobby {
        if(!this.instance){
            return new Lobby(new Player(''));
        }
        return this.instance;
    }

    static resetInstance() {
        this.instance = new Lobby(new Player(''));
    }

    static hostIsConnected(): boolean {
        if(!Lobby.getInstance().getHost().getName()){
            return false;
        }
        return Lobby.instance && Lobby.getInstance().getHost().getName().localeCompare('')!=0;
    }

    private players: Player[];
    private host: Player;

    constructor(host: Player){
        this.host = host
        this.players = Array<Player>(this.host);
    }

    addPlayer(userId: string): void {
        for(let player of this.players){
            if(!userId || !player.getName() || player.getName().localeCompare(userId)==0){
                return;
            }
        }
        this.players.push(new Player(userId));
    }

    removePlayer(userId: string) : void{
        var newPlayers : Player[] = Array<Player>();
        for(let player of this.players){
            if(player.getName() && player.getName().localeCompare(userId)!=0){
                newPlayers.push(player);
            }
        }
        this.players = newPlayers;
    }

    getHost(){
        return this.host;
    }

    getPlayers(){
        return this.players;
    }
}