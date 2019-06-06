import { ProposedWord } from './ProposedWord';

export class Player {
    /**
     * Pseudo du joueur
     */
    private name: string;
    /**
     * Nom de l'équipe
     */
    private team: string;
    /**
     * Liste des mots que le joueur a proposés
     */
    private proposedWords: Array<ProposedWord>;
    /**
     * Score du joueur :
     *  1 point par lettre trouvée
     *  1 point par lettre bien placée
     *  3 points pour les 2 d'un coup
     */
    private score: number;

    constructor(name: string, team: string) {
        this.name = name;
        this.team = team;
        this.proposedWords = new Array<ProposedWord>();
        this.score = 0;
    }

    getName(): string {
        return this.name;
    }

    getTeam(): string {
        return this.team;
    }

    getProposedWords(): Array<ProposedWord> {
        return this.proposedWords;
    }

    getScore(): number {
        return this.score;
    }

    /**
     * Ajoute un mot à la liste des mots proposés par le joueur
     * @param word - Mot accompagné de son score
     */
    addProposedWord(word: ProposedWord) {
        this.proposedWords.push(word);
    }

    /**
     * Permet de connaître le nombre d'essais effectués par le joueur
     */
    getTryNumber(): number {
        return this.proposedWords.length;
    }

    /**
     * Indique l'efficacité d'un joueur (= somme des score des mots proposés / nb de mots proposés)
     */
    getEfficacy(): number {
        let efficacy = 0;
        this.proposedWords.forEach(word => {
            efficacy += word.getScore().getTotalScore();
        });
        return efficacy / this.getTryNumber();
    }

    /**
     * Méthode permettant d'ajouter des points au score du joueur
     * @param points - Points à ajouter au score
     */
    addToScore(points: number) {
        this.score += points;
        console.log('Nouveau score du joueur : ' + this.score);
    }
}
