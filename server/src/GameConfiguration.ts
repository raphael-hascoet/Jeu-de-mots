import fs from 'fs';

export class GameConfiguration {
    private levelInterval = [0, 0];

    constructor() {}

    /**
     * Méthode permettant d'initialiser l'intervalle de difficulté maximal.
     * Permet d'attendre que l'intervalle soit trouvé en lisant le dictionnaire (méthode searchInterval)
     * avant de continuer : à appeler dans une méthode 'async' en faisant
     * await gameConfiguration.calculLevelInterval();
     */
    public calculLevelInterval() {
        return this.searchInterval().then(
            data => {
                this.levelInterval = data;
            },
            error => {
                throw new Error(error);
            }
        );
    }

    /**
     * Fonction qui permet de trouver l'intervalle de niveaux disponibles pour le joueur
     * (en fonction de la taille des mots présents dans le fichier texte)
     * @returns [borne inférieure, borne supérieure]
     */
    async searchInterval(): Promise<[number, number]> {
        let minLength = 9999;
        let maxLength = 0;
        return new Promise((resolve, reject) => {
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
                resolve([minLength, maxLength]);
            });
        });
    }

    /**
     * Permet de connaître la difficulté minimale que le jeu peut avoir
     */
    getMinimalDifficulty(): number {
        return this.levelInterval[0];
    }

    /**
     * Permet de connaître la difficulté maximale que le jeu peut avoir
     */
    getMaximalDifficulty(): number {
        return this.levelInterval[1];
    }
}
