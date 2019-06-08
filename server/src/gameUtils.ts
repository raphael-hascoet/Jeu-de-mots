import fs from 'fs';
import { Player } from './Player';
import { Game } from './Game';
import { Score } from './Score';

export function createGame(
    hostName: string,
    hostTeam: string,
    difficultyLevel: number
): Game {
    let host = new Player(hostName, hostTeam);
    let game = Game.getInstance(host, difficultyLevel);

    return game;
}

/**
 * Cette fonction calcul le score d'un mot proposé par les joueur en le comparant avec le mot à trouver
 *
 * @param proposedWord le mot proposé par le joueur
 * @param wordToFind le mot à trouver
 *
 * @return le score du mot proposé
 */
export function calculateWordScore(
    proposedWord: string,
    wordToFind: string
): Score {
    let correctPlace = 0;
    let correctLetter = 0;

    for (let i = 0; i < proposedWord.length; i++) {
        if (wordToFind.charAt(i)) {
            if (wordToFind.charAt(i) == proposedWord.charAt(i)) {
                correctPlace++;
            } else if (wordToFind.includes(proposedWord.charAt(i) + '')) {
                correctLetter++;
            }
        }
    }

    let score = new Score(correctPlace, correctLetter);

    return score;
}
