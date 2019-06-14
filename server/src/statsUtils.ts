import { Game } from './Game';
import TsMap from 'ts-map';
import { Player } from './Player';
import { Badge } from './Badge';

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
 * @param length - Taille du mot à trouver
 * @returns Array<string> - Données globales de la partie
 *          Array<Array<string>> - Statistiques de chaque joueur
 */
export function getGameStats(
    length: number
): [Array<string>, Array<Array<string>>] {
    let global = new Array<string>();
    global.push(Game.getInstance().getTeamName());
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
    Game.getInstance().setPlayers(
        findBadge(Game.getInstance().getPlayers(), length)
    );
    let players = new Array<Array<string>>();
    for (let player of Game.getInstance().getPlayers()) {
        let data = new Array<string>();
        data.push(player.getName());
        data.push(player.getScore().toString());
        data.push(player.getEfficacy(length).toString());
        data.push(player.getTryNumber().toString());
        data.push(Badge[player.getBadge()].toLowerCase());
        players.push(data);
    }
    return [global, players];
}

/**
 * Méthode permettant d'attribuer un badge à chaque joueur en fin de partie
 * @param players - Liste des joueurs
 * @param length - Taille du mot à trouver
 */
function findBadge(players: Array<Player>, length: number): Array<Player> {
    let badges = new TsMap<Badge, Array<Player>>();
    let [hellFestPlayers, ramboPlayers] = findHellfestAndRambo(players);
    badges.set(Badge.HELLFEST, hellFestPlayers);
    badges.set(Badge.RAMBO, ramboPlayers);
    badges.set(Badge.ECRIVAIN, findWriter(players));
    badges.set(Badge.BOURRIN, findRough(players, length));
    badges.forEach((playersToBadge, badgeToAdd) => {
        let playerToBadge = undefined;
        let found: boolean = false;
        if (
            playersToBadge != undefined &&
            badgeToAdd != undefined &&
            playersToBadge.length > 1
        ) {
            playersToBadge.forEach(player => {
                badges.forEach((players2, badge) => {
                    if (
                        badge != badgeToAdd &&
                        players2 != undefined &&
                        players[players.indexOf(player)].getBadge() ==
                            Badge.NULL &&
                        players2.find(p => p.getName() == player.getName())
                    ) {
                        playerToBadge = player;
                        found = true;
                    }
                });
            });
        }
        if (playersToBadge != undefined && badgeToAdd != undefined) {
            if (!found) {
                playerToBadge = playersToBadge[0];
            }
            if (
                playerToBadge != undefined &&
                playerToBadge.getBadge() == Badge.NULL
            ) {
                players[players.indexOf(playerToBadge)].setBadge(badgeToAdd);
            }
        }
    });
    return players;
}

/**
 * Trouve les joueurs "Bourrin"
 * @param players - Joueurs de la partie
 * @param length - Taille du mot à trouver
 */
function findRough(players: Player[], length: number): Array<Player> {
    let maxRatio = 0;
    let roughPlayers = new Array<Player>();
    players.forEach(player => {
        let ratio = player.getTryNumber() / player.getEfficacy(length);
        if (ratio >= maxRatio) {
            maxRatio = ratio;
            if (
                roughPlayers.length > 0 &&
                roughPlayers[0].getTryNumber() /
                    roughPlayers[0].getEfficacy(length) !=
                    ratio
            ) {
                roughPlayers = new Array<Player>();
            }
            roughPlayers.push(player);
        }
    });
    return roughPlayers;
}

/**
 * Trouve les joueurs "Ecrivain"
 * @param players - Joueurs de la partie
 */
function findWriter(players: Player[]): Array<Player> {
    let maxAvgLength = 0;
    let writerPlayers = new Array<Player>();
    players.forEach(player => {
        let avg = player.getWordAvgLength();
        if (avg >= maxAvgLength) {
            maxAvgLength = avg;
            if (
                writerPlayers.length > 0 &&
                writerPlayers[0].getWordAvgLength() != avg
            ) {
                writerPlayers = new Array<Player>();
            }
            writerPlayers.push(player);
        }
    });
    return writerPlayers;
}

/**
 * Méthode permettant de trouver les joueurs "HellFest" et "Rambo"
 * @param players - Joueurs de la partie
 * @returns liste des joueurs hellfest et rambo
 */
function findHellfestAndRambo(
    players: Array<Player>
): [Array<Player>, Array<Player>] {
    let minWords = 9999999;
    let maxWords = 0;
    let hellFestPlayers = new Array<Player>();
    let ramboPlayers = new Array<Player>();
    players.forEach(player => {
        let nbWords = player.getTryNumber();
        if (nbWords <= minWords) {
            minWords = nbWords;
            if (
                hellFestPlayers.length > 0 &&
                hellFestPlayers[0].getTryNumber() != nbWords
            ) {
                hellFestPlayers = new Array<Player>();
            }
            hellFestPlayers.push(player);
        }
        if (nbWords >= maxWords) {
            maxWords = nbWords;
            if (
                ramboPlayers.length > 0 &&
                ramboPlayers[0].getTryNumber() != nbWords
            ) {
                ramboPlayers = new Array<Player>();
            }
            ramboPlayers.push(player);
        }
    });
    return [hellFestPlayers, ramboPlayers];
}
