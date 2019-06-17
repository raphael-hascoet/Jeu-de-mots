import fs from 'fs';
import { Player } from './Player';
import { Game } from './Game';
import { Score } from './Score';

export function createGame(
    hostName: string,
    hostTeam: string,
    difficultyLevel: number
): Game {
    let host = new Player(hostName);
    let game = Game.getInstance(host, hostTeam, difficultyLevel);

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
    wordToFind: string,
    proposedWord: string
): Score {
    let correctPlace = 0;
    let correctLetter = 0;
    let lettresNotFound = wordToFind;

    for (let i = 0; i < proposedWord.length; i++) {
        if (
            wordToFind.charAt(i) &&
            wordToFind.charAt(i) == proposedWord.charAt(i)
        ) {
            correctPlace++;
            if (!lettresNotFound.includes(proposedWord.charAt(i) + '')) {
                correctLetter--;
            } else {
                lettresNotFound = lettresNotFound.replace(
                    proposedWord.charAt(i),
                    ''
                );
            }
        } else if (
            wordToFind.includes(proposedWord.charAt(i) + '') &&
            lettresNotFound.includes(proposedWord.charAt(i) + '')
        ) {
            correctLetter++;
            lettresNotFound = lettresNotFound.replace(
                proposedWord.charAt(i),
                ''
            );
        }
    }

    let score = new Score(correctPlace, correctLetter);

    return score;
}
