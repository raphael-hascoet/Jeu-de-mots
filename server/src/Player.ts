import { ProposedWord } from './ProposedWord';

export class Player {
    /**
     * Pseudi du joueur
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

    constructor(name: string, team: string) {
        this.name = name;
        this.team = team;
        this.proposedWords = new Array<ProposedWord>();
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
}
