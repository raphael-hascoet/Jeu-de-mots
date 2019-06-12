import { Game } from './Game';
import TsMap from 'ts-map';

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

/**
 * Méthode permettant de construire la chronologie de la partie
 * @returns Array<string> - Liste des mots proposés
 *          Array<number> - Score associé à chaque mot proposé
 */
export function getChronology(): [Array<string>, Array<number>] {
    let x = new Array<string>();
    let data = new Array<number>();
    for (let word of Game.getInstance().getProposedWords()) {
        x.push(word.getWord());
        data.push(word.getScore().getTotalScore());
    }
    return [x, data];
}

/**
 * Méthode permettant de récupérer les statistiques de la partie
 * @returns Array<string> - Données globales de la partie
 *          Array<Array<string>> - Statistiques de chaque joueur
 */
export function getGameStats(): [Array<string>, Array<Array<string>>] {
    let global = new Array<string>();
    global.push(
        Game.getInstance()
            .getHost()
            .getTeam()
    );
    global.push(
        Game.getInstance()
            .getScore()
            .toString()
    );
    global.push(
        Game.getInstance()
            .getTryNumber()
            .toString()
    );
    global.push('timer');
    let players = new Array<Array<string>>();
    for (let player of Game.getInstance().getPlayers()) {
        let data = new Array<string>();
        data.push(player.getName());
        data.push(player.getScore().toString());
        data.push(player.getEfficacy().toString());
        data.push(player.getTryNumber().toString());
        data.push('null');
        players.push(data);
    }
    return [global, players];
}
