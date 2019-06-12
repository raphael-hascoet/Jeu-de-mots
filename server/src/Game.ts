import fs from 'fs';
import { latinise } from './stringUtil';
import { Player } from './Player';
import { ProposedWord } from './ProposedWord';
import { Score } from './Score';
import { WordToFind } from './WordToFind';
import { Badge } from './Badge';
import TsMap from 'ts-map';

/**
 * Classe comprenant toutes les méthodes nécessaires à la gestion d'une partie
 */
export class Game {
    private static instance: Game;

    /**
     * Méthode du design pattern singleton, permet de créer ou de récupérer la partie jouée sur le serveur
     *
     * @param host hébergeur de la partie, remplir pour créer une nouvelle partie
     * @param difficulty  difficulté de la partie, remplir pour créer une nouvelle partie
     *
     */
    static getInstance(
        host = new Player('null', 'null'),
        difficulty = 4
    ): Game {
        if (!Game.instance || host.getName() != 'null') {
            Game.instance = new Game(host, difficulty);
        }

        return Game.instance;
    }

    /**
     * Hebergeur de la partie
     */
    private host: Player;

    /**
     * Liste des joueurs de la partie
     */
    private players: Array<Player>;

    /**
     * Niveau de difficulté de la partie
     */
    private difficultyLevel: number;
    /**
     * Liste des mots proposés par tous les joueurs
     */
    private proposedWords: Array<ProposedWord>;
    /**
     * Mot à trouver
     */
    private wordToFind: WordToFind;

    /**
     * Constructeur d'une partie
     */
    private constructor(host: Player, difficultyLevel: number) {
        this.host = host;
        this.players = new Array<Player>();
        this.players.push(this.host);
        this.difficultyLevel = difficultyLevel;
        this.proposedWords = new Array<ProposedWord>();
        this.wordToFind = new WordToFind('');
    }

    /**
     * Méthode permettant de démarrer le jeu.
     * Permet d'attendre que le mot dans le dictionnaire soit trouvé (méthode readDictionnary)
     * avant de continuer : à appeler dans une méthode 'async' en faisant
     * await Game.getInstance().startGame();
     */
    public startGame() {
        return this.readDictionnary().then(
            data => {
                this.wordToFind = new WordToFind(data);
            },
            error => {
                throw new Error(error);
            }
        );
    }

    /**
     * Méthode permettant de trouver un mot dans le dictionnaire pour démarrer une partie
     */
    async readDictionnary(): Promise<string> {
        let difficulty = this.difficultyLevel;
        if (difficulty == 0) {
            //if(difficulty < gameConfiguration.getMinimalDifficulty() || difficulty > gameConfiguration.getMaximalDifficulty())
            //ligne ci-dessus à décommenter dans tout sera mis en place
            throw new Error("La difficulté n'est pas valide.");
        }
        let word = '';
        return new Promise(
            (resolve, reject): void => {
                fs.readFile(
                    'resources/liste_francais.txt',
                    'utf8',
                    (err, data) => {
                        if (err) throw err;
                        let words: string[] = data.toString().split('\n');
                        while (
                            word.length != difficulty ||
                            word.includes('-')
                        ) {
                            let random: number = Math.floor(
                                Math.random() * words.length
                            );
                            word = words[random].trim();
                        }
                        word = latinise(word.toLocaleLowerCase());
                        resolve(word);
                    }
                );
            }
        );
    }

    getWordToFind(): string {
        return this.wordToFind.getWord();
    }

    getHost(): Player {
        return this.host;
    }

    getPlayers(): Array<Player> {
        return this.players;
    }

    getDifficultyLevel(): number {
        return this.difficultyLevel;
    }

    getProposedWords(): Array<ProposedWord> {
        return this.proposedWords;
    }

    /**
     * Méthode permettant de trouver un joueur grâce à son nom
     * @param name - Nom du joueur à trouver
     */
    getPlayer(name: string): Player {
        for (let player of this.players) {
            if (player.getName() == name) {
                return player;
            }
        }
        throw new Error('The player ' + name + " isn't in the game");
    }

    setPlayers(players: Array<Player>) {
        this.players = players;
    }

    /**
     * Méthode permettant d'ajouter un mot à la liste des mots proposés globalement ainsi que la liste personnelle des joueurs
     * @param word - Mot à ajouter
     * @param score - Score correspondant à ce mot (dépend du mot à trouver)
     * @param player - Joueur qui a proposé le mot
     */
    addProposedWord(word: string, score: Score, player: Player) {
        let proposedWord = new ProposedWord(word, score);
        this.proposedWords.push(proposedWord);
        player.addProposedWord(proposedWord);
    }

    /**
     * Méthode permettant de récupérer la liste des nb meilleurs mots proposés (en fonction de leur score)
     * @param nb - Nombre de mots à récupérer
     */
    getBestProposedWords(nb: number): Array<ProposedWord> {
        let sortedWords: Array<ProposedWord> = this.proposedWords;
        sortedWords.sort((a, b) => {
            return b.getScore().getTotalScore() - a.getScore().getTotalScore();
        });
        let wordsToReturn = new Array<ProposedWord>();
        for (let i = 0; i < nb && i < sortedWords.length; i++) {
            wordsToReturn.push(sortedWords[i]);
        }
        return wordsToReturn;
    }

    /**
     * Permet de connaître le nombre d'essais effectués par l'équipe
     */
    getTryNumber(): number {
        return this.proposedWords.length;
    }

    /**
     * Permet de connaître l'intervalle de tailles des mots proposés par les joueurs
     * @returns index 0 : taille minimale trouvée
     *          index 1 : taille maximale trouvée
     */
    getWordLengthInterval(): [number, number] {
        let minLength = 999999;
        let maxLength = 0;
        for (let word of this.proposedWords) {
            let length = word.getLength();
            if (length < minLength) {
                minLength = length;
            }
            if (length > maxLength) {
                maxLength = length;
            }
        }
        return [minLength, maxLength];
    }

    /**
     * Méthode permettant de récupérer le score de la partie
     */
    getScore(): number {
        let score = 0;
        for (let player of this.players) {
            score += player.getTotalWordScore();
        }
        return score;
    }

    /**
     * Méthode permettant de calculer le score du joueur en fonction du mot qu'il a proposé
     * @param player - Joueur ayant proposé un mot
     * @param word - Mot proposé
     */
    calculatePlayerScore(player: Player, word: string) {
        player.addToScore(
            this.wordToFind.calculatePlayerScore(word.toLocaleLowerCase())
        );
    }
}
