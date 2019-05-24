import fs from 'fs';
import { BehaviorSubject } from 'rxjs';

export class GameConfiguration {
    /**
     * Permet de mettre à jour l'intervalle de niveaux disponibles
     */
    private intervalSrc = new BehaviorSubject<[number, number]>([0, 0]);

    /**
     * Permet de récupérer le mot de manière asynchrone
     */
    private intervalObserver = this.intervalSrc.asObservable();
    private levelInterval = [0, 0];

    constructor() {
        this.intervalObserver.subscribe(data => {
            this.levelInterval = data;
        });
    }

    /**
     * Fonction qui permet de trouver l'intervalle de niveaux disponibles pour le joueur
     * (en fonction de la taille des mots présents dans le fichier texte)
     * @returns [borne inférieure, borne supérieure]
     */
    getLevelInterval(): void {
        let minLength = 9999;
        let maxLength = 0;
        fs.readFile('resources/liste_francais.txt', 'utf8', (err, data) => {
            if (err) throw err;
            let words: string[] = data.toString().split('\n');
            words.forEach(word => {
                if (word.trim().length != 0) {
                    let wordLength = word.trim().length;
                    if (wordLength < minLength) {
                        minLength = wordLength;
                    }
                    if (wordLength > maxLength) {
                        maxLength = wordLength;
                    }
                }
            });
            this.intervalSrc.next([minLength, maxLength]);
        });
    }
}
