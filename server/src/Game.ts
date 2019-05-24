import fs from 'fs';
import { latinise } from './stringUtil';
import { BehaviorSubject } from 'rxjs';
import { Player } from './Player';

/**
 * Classe comprenant toutes les méthodes nécessaires à la gestion d'une partie
 */
export class Game {
    /**
     * @param wordSrc - Permet de mettre à jour le mot lors de la recherche dans le dictionnaire
     * @param wordObserver - Permet de récupérer le mot de manière asynchrone
     */
    private wordSrc = new BehaviorSubject<string>('');
    public wordObserver = this.wordSrc.asObservable();

    /**
     * hebergeur de la partie
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
     * Constructeur d'une partie
     */
    constructor(host: Player, difficultyLevel: number) {
        this.host = host;
        this.players = new Array<Player>();
        this.players.push(this.host);
        this.difficultyLevel = difficultyLevel;

        // Méthode qui s'exécute une fois que findWord est fini
        this.wordObserver.subscribe(data => {
            if (data.trim().length != 0) {
                console.log(data);
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
}
