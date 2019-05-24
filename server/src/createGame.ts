import { Player } from './Player';
import { Game } from './Game';

export function createGame(
    hostName: string,
    hostTeam: string,
    difficultyLevel: number
): Game {
    let host = new Player(hostName, hostTeam);
    let game = new Game(host, difficultyLevel);

    return game;
}
