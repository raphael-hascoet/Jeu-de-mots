import fs from 'fs';
import { latinise } from './stringUtil';
import { Player } from './Player';

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
        if (!Game.instance || host.getName()!='null') {
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
    /**
     * Liste des mots proposés par les joueurs
     */
    private proposedWords: Array<string /*, number*/>;

    private wordToFind = '';

    /**
     * Constructeur d'une partie
     */
    private constructor(host: Player, difficultyLevel: number) {
        this.host = host;
        this.players = new Array<Player>();
        this.players.push(this.host);
        this.difficultyLevel = difficultyLevel;
        this.proposedWords = new Array<string /*, number*/>();
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

    addProposedWord(word: string /*, score: number*/) {
        this.proposedWords.push(word /*, score*/);
    getHost(): Player {
        return this.host;
    }

    getDifficultyLevel(): number {
        return this.difficultyLevel;
    }
    }

    getProposedWords(): Array<string> {
        /*let sortedWords = new Array(
            Array.from(this.proposedWords).sort((a, b) => {
                return a[1] - b[1];
            })
        );
        let wordsToReturn = new Map<string, number>();
        let nbWordsToReturn = 5;
        for (let i = 0; i < nbWordsToReturn; i++) {
            wordsToReturn.set(
                sortedWords[i],
                this.proposedWords.get(sortedWords[i]))
            );
        }*/
        return this.proposedWords;
    }
}
