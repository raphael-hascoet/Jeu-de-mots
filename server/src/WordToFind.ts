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
     * @returns number : score à ajouter au score du joueur
     *          Array<string> : texte à afficher aux autres joueurs
     */
    calculatePlayerScore(proposedWord: string): [number, string] {
        let text = '';
        let nbLettersProposedWord = this.calculateNbLettersInWord(proposedWord);
        let nbFound = this.findNewLetters(nbLettersProposedWord);
        let resultPlaced = this.findPlacedLetters(
            proposedWord,
            nbFound,
            nbLettersProposedWord
        );
        if (resultPlaced[2] != 0) {
            text += ' a trouvé ' + resultPlaced[2];
            if (nbFound == 1) {
                text += ' nouvelle lettre';
            } else {
                text += ' nouvelles lettres';
            }
        }
        if (resultPlaced[1] != 0) {
            if (text != '') {
                text += ' et ';
            }
            text += ' a bien placé ' + resultPlaced[1];
            if (resultPlaced[1] == 1) {
                text += ' nouvelle lettre';
            } else {
                text += ' nouvelles lettres';
            }
        }
        this.updateNbLettersFounded(nbLettersProposedWord);
        return [nbFound + resultPlaced[0], text];
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
     * @param nbFound - Nombre de lettres déjà trouvées
     * @param nbLettersProposedWord - Nombre d'occurrences de chaque lettres dans le mot proposé
     * @returns number : nombre de points à ajouter au joueur
     *          number : nombre de lettres qu'il a bien placées
     *          number : nombre de lettres trouvées par le joueur (sans compter celles bien placées)
     */
    private findPlacedLetters(
        proposedWord: string,
        nbFound: number,
        nbLettersProposedWord: TsMap<string, number>
    ): [number, number, number] {
        let nbPoints = 0;
        let nbPlaced = 0;
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
                nbPlaced++;
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
                    nbFound--;
                }
            }
        }
        return [nbPoints, nbPlaced, nbFound];
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
