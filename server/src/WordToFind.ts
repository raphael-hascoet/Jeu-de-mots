import TsMap from 'ts-map';
import { stringify } from 'querystring';
import { calculateWordScore } from './gameUtils';

/**
 * Classe représentant le mot à trouver et son état de découverte
 */
export class WordToFind {
    /**
     * Mot à trouver
     */
    private word: string;
    /**
     * Map liant chaque lettre du mot à son nombre d'occurrences
     */
    private nbLetters: TsMap<string, number>;
    /**
     * Etat du mot trouvé (à l'origine uniquement des '....')
     */
    private wordState: string;
    /**
     * Nombre de lettres déjà trouvées par les joueurs
     */
    private nbLettersFound: TsMap<string, number>;

    /**
     * Constructeur de la classe
     * @param word - Mot que les joueurs doivent trouver
     */
    constructor(word: string) {
        this.word = word;
        this.nbLettersFound = new TsMap<string, number>();
        this.wordState = '';
        for (let i = 0; i < word.length; i++) {
            this.wordState += '.';
        }
        this.nbLetters = this.calculateNbLettersInWord(word);
    }

    /**
     * Méthode permettant de calculer le nombre d'occurrences des lettres trouvées dans le mot
     * @param word - Mot pour lequel il faut calculer les occurrences
     */
    calculateNbLettersInWord(word: string): TsMap<string, number> {
        let map = new TsMap<string, number>();
        word.split('').forEach(letter => {
            let actualNb = map.get(letter) == undefined ? 0 : map.get(letter);
            if (actualNb != undefined) {
                map.set(letter, actualNb + 1);
            }
        });
        return map;
    }

    getWord(): string {
        return this.word;
    }

    /**
     * Méthode permettant de calculer le score du joueur ayant proposé le mot
     * @param proposedWord - Mot proposé par le joueur
     */
    calculatePlayerScore(proposedWord: string): number {
        let nbLettersProposedWord = this.calculateNbLettersInWord(proposedWord);
        let nbPoints = this.findNewLetters(nbLettersProposedWord);
        nbPoints = this.findPlacedLetters(
            proposedWord,
            nbPoints,
            nbLettersProposedWord
        );
        this.updateNbLettersFounded(nbLettersProposedWord);
        return nbPoints;
    }

    /**
     * Méthode permettant de savoir si le joueur a trouvé des nouvelles lettres dans le mot
     * @param nbLettersProposedWord - Nombre d'occurrences par lettre dans le mot proposé
     */
    private findNewLetters(nbLettersProposedWord: TsMap<string, number>) {
        let nbPoints = 0;
        nbLettersProposedWord.forEach((number, letter) => {
            if (letter != undefined) {
                let nbOccurrences =
                    this.nbLetters.get(letter) == undefined
                        ? 0
                        : this.nbLetters.get(letter);
                let nbFoundedOccurrences =
                    this.nbLettersFound.get(letter) == undefined
                        ? 0
                        : this.nbLettersFound.get(letter);
                number = number == undefined ? 0 : number;
                if (
                    nbOccurrences != undefined &&
                    nbOccurrences > 0 &&
                    (nbFoundedOccurrences != undefined &&
                        nbFoundedOccurrences < nbOccurrences &&
                        number > nbFoundedOccurrences)
                ) {
                    let points =
                        nbFoundedOccurrences == 0
                            ? number
                            : number - nbFoundedOccurrences;
                    if (points > nbOccurrences) {
                        points = nbOccurrences;
                    }
                    nbPoints += points;
                }
            }
        });
        return nbPoints;
    }

    /**
     * Méthode permettant de trouver les lettres bien placées
     * @param proposedWord - Mot proposé
     * @param nbPoints - Nombre de points actuel du joueur
     * @param nbLettersProposedWord - Nombre d'occurrences de chaque lettres dans le mot proposé
     */
    private findPlacedLetters(
        proposedWord: string,
        nbPoints: number,
        nbLettersProposedWord: TsMap<string, number>
    ) {
        for (
            let index = 0;
            index < proposedWord.length && index < this.word.length;
            index++
        ) {
            let letter = proposedWord.charAt(index);
            if (
                letter == this.word.charAt(index) &&
                this.wordState.charAt(index) == '.'
            ) {
                nbPoints++;
                this.updateWordState(index, letter);
                let nbLetters =
                    nbLettersProposedWord.get(letter) == undefined
                        ? 0
                        : nbLettersProposedWord.get(letter);
                let nbFounded =
                    this.nbLettersFound.get(letter) == undefined
                        ? 0
                        : this.nbLettersFound.get(letter);
                if (
                    nbLetters != undefined &&
                    nbFounded != undefined &&
                    nbLetters > nbFounded
                ) {
                    nbPoints++;
                }
            }
        }
        return nbPoints;
    }

    /**
     * Méthode permettant de mettre à jour l'état du mot trouvé par les joueurs
     * @param index - Index du caractère à modifier
     * @param letter - Lettre à insérer
     */
    updateWordState(index: number, letter: string) {
        let firstPart = this.wordState.substring(0, index);
        let secondPart = this.wordState.substring(
            index + 1,
            this.wordState.length
        );
        this.wordState = firstPart + letter + secondPart;
    }

    /**
     * Méthode permettant de mettre à jour le nombre de lettres trouvées par les joueurs
     * @param nbLettersProposedWord - Nombre d'occurrences des lettres dans le mot proposé
     */
    updateNbLettersFounded(nbLettersProposedWord: TsMap<string, number>) {
        nbLettersProposedWord.forEach((nbProposed, letter) => {
            if (letter != undefined) {
                let nbFound =
                    this.nbLettersFound.get(letter) == undefined
                        ? 0
                        : nbLettersProposedWord.get(letter);
                let nbMax =
                    this.nbLetters.get(letter) == undefined
                        ? 0
                        : this.nbLetters.get(letter);
                if (
                    nbProposed != undefined &&
                    nbFound != undefined &&
                    nbMax != undefined &&
                    nbProposed > nbFound
                ) {
                    let nb = nbProposed > nbMax ? nbMax : nbProposed;
                    this.nbLettersFound.set(letter, nb);
                }
            }
        });
    }
}
