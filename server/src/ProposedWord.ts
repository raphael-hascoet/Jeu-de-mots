import { Score } from './Score';

/**
 * Classe permettant de représenter un mot qui a été proposé par un joueur
 */
export class ProposedWord {
    /**
     * Mot proposé
     */
    private word: string;
    /**
     * Score qui y est associé
     */
    private score: Score;

    constructor(word: string, score: Score) {
        this.word = word;
        this.score = score;
    }

    getScore() {
        return this.score;
    }

    getWord() {
        return this.word;
    }

    /**
     * Méthode permettant de connaître la taille du mot
     */
    getLength() {
        return this.word.length;
    }
}
