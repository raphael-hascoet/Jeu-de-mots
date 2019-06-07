import fs from 'fs';
import { Player } from './Player';
import { Game } from './Game';
import { Score } from './Score';
import { GameConfiguration } from './GameConfiguration';
import TsMap from 'ts-map';

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

/**
 * Fonction permettant de construire le format des données à envoyer pour afficher
 * le diagramme baton du rapport nombre d'essais par nombre de lettres (pour chaque joueur)
 * @param gameConfig - Objet de configurations du jeu
 * @returns Array<number> - Liste des tailles des mots proposés
 *          TsMap<string, Array<number>> - Chaque objet correspond aux statistiques d'un joueur,
 *          on y voit son nom et le nombre de mots qu'il a proposés selon leur taille
 */
export function getStatNbLetter(): [
    Array<number>,
    TsMap<string, Array<number>>
] {
    let game = Game.getInstance();
    let interval = game.getWordLengthInterval();
    let x = new Array<number>();
    for (let length = interval[0]; length <= interval[1]; length++) {
        x.push(length);
    }
    let players = new TsMap<string, Array<number>>();
    for (let player of game.getPlayers()) {
        let data = player.getNbWordByLength(interval);
        players.set(player.getName(), data);
    }
    return [x, players];
}
