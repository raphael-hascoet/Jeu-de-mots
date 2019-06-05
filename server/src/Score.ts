export class Score {
    private correctPlace: number;
    private correctLetter: number;

    constructor(correctPlace: number, correctLetter: number) {
        this.correctPlace = correctPlace;
        this.correctLetter = correctLetter;
    }

    getcorrectPlace(): number {
        return this.correctPlace;
    }

    getcorrectLetter(): number {
        return this.correctLetter;
    }

    getTotalScore(): number {
        return this.correctPlace + this.correctLetter * 0.5;
    }
}
