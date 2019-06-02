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
    private score: number;

    constructor(word: string, score: number) {
        this.word = word;
        this.score = score;
    }

    getScore() {
        return this.score;
    }
}
