import { Player } from './Player';

export class Game {
    private host: Player;
    private players: Array<Player>;
    private difficultyLevel: number;

    constructor(host: Player, difficultyLevel: number) {
        this.host = host;
        this.players = new Array<Player>();
        this.players.push(this.host);
        this.difficultyLevel = difficultyLevel;
    }
}
