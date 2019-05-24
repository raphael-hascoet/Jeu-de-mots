import fs from 'fs';
import { latinise } from './stringUtil';
import { BehaviorSubject } from 'rxjs';
import { Player } from './Player';

/**
 * Classe comprenant toutes les méthodes nécessaires à la gestion d'une partie
 */
export class Game {
    private static instance: Game;

    static getInstance(
        host = new Player('null', 'null'),
        difficulty = 0
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

        // Méthode qui s'exécute une fois que findWord est fini
        this.wordObserver.subscribe(data => {
            if (data.trim().length != 0) {
                this.wordToFind = data;
            }
        });
        this.findWord();
    }

    /**
     * Méthode permettant de trouver un mot dans le dictionnaire pour démarrer une partie
     */
    findWord() {
        let word = '';
        fs.readFile('resources/liste_francais.txt', 'utf8', (err, data) => {
            if (err) throw err;
            let words: string[] = data.toString().split('\n');
            while (word.length != this.difficultyLevel) {
                let random: number = Math.floor(Math.random() * words.length);
                word = words[random].trim();
            }
            word = latinise(word.toLocaleLowerCase());
            this.wordSrc.next(word); // Met à jour le mot
        });
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
}
