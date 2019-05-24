import fs from 'fs';
import { latinise } from './stringUtil';
import { BehaviorSubject } from 'rxjs';

/**
 * Classe comprenant toutes les méthodes nécessaires à la gestion d'une partie
 */
export class Party {
    /**
     * @param wordSrc - Permet de mettre à jour le mot lors de la recherche dans le dictionnaire
     * @param wordObserver - Permet de récupérer le mot de manière asynchrone
     */
    private wordSrc = new BehaviorSubject<string>('');
    public wordObserver = this.wordSrc.asObservable();

    /**
     * Constructeur d'une partie
     * @param length - Taille que doit avoir le mot à trouver
     */
    constructor(length: number) {
        // Méthode qui s'exécute une fois que findWord est fini
        this.wordObserver.subscribe(data => {
            if (data.trim().length != 0) {
                console.log(data);
            }
        });
        this.findWord(length);
    }

    /**
     * Méthode permettant de trouver un mot dans le dictionnaire pour démarrer une partie
     * @param length - Nombre de caractères du mot à trouver
     */
    findWord(length: number) {
        let word = '';
        fs.readFile('resources/liste_francais.txt', 'utf8', (err, data) => {
            if (err) throw err;
            let words: string[] = data.toString().split('\n');
            while (word.length != length) {
                let random: number = Math.floor(Math.random() * words.length);
                word = words[random].trim();
            }
            word = latinise(word.toLocaleLowerCase());
            this.wordSrc.next(word); // Met à jour le mot
        });
    }
}
