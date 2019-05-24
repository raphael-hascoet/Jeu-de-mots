import fs from 'fs';
import { latinise } from './stringUtil';
import { Player } from './Player';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

/**
 * Classe comprenant toutes les méthodes nécessaires à la gestion d'une partie
 */
export class Game {
    private static instance: Game;

    static getInstance(
        host = new Player('null', 'null'),
        difficulty = 4
    ): Game {
        if (!Game.instance) {
            Game.instance = new Game(host, difficulty);
        }

        return Game.instance;
    }

    /**
     * Permet de mettre à jour le mot lors de la recherche dans le dictionnaire
     */
    private wordSrc = new BehaviorSubject<string>('');

    /**
     * Permet de récupérer le mot de manière asynchrone
     */
    public wordObserver = this.wordSrc.asObservable();

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

    private wordToFind = '';

    /**
     * Constructeur d'une partie
     */
    private constructor(host: Player, difficultyLevel: number) {
        this.host = host;
        this.players = new Array<Player>();
        this.players.push(this.host);
        this.difficultyLevel = difficultyLevel;
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
                this.wordToFind = data;
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
            //A améliorer avec l'intervalle
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
                        while (word.length != difficulty) {
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
        return this.wordToFind;
    }

    getHost() : Player{
        return this.host;
    }

    getDifficultyLevel() : number{
        return this.difficultyLevel;
    }

    wait(ms: number): void {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    }
}
