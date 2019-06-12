import { ProposedWord } from './ProposedWord';
import { Badge } from './Badge';

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
    /**
     * Badge du joueur
     */
    private badge: Badge;

    constructor(name: string, team: string) {
        this.name = name;
        this.team = team;
        this.proposedWords = new Array<ProposedWord>();
        this.score = 0;
        this.badge = Badge.NULL;
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
     * Méthode permettant de récupérer le total des scores de tous les mots
     */
    getTotalWordScore(): number {
        let score = 0;
        for (let word of this.proposedWords) {
            score += word.getScore().getTotalScore();
        }
        return score;
    }

    getBadge(): Badge {
        return this.badge;
    }

    setBadge(badge: Badge) {
        this.badge = badge;
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
        console.log(
            'Nouveau score du joueur ' + this.name + ' : ' + this.score
        );
    }

    /**
     * Méthode permettant de récupérer le nombre de mots proposés en fonction de leur taille
     * @param interval - Intervalle de tailles entre lequel les tailles des mots doivent être comprises
     */
    getNbWordByLength(interval: [number, number]): Array<number> {
        let stats = new Array<number>();
        let minLength = interval[0];
        let maxLength = interval[1];
        for (let length = minLength; length <= maxLength; length++) {
            stats.push(0);
        }
        for (let word of this.proposedWords) {
            stats[word.getLength() - minLength]++;
        }
        return stats;
    }

    /**
     * Calcule la moyenne de taille des mots proposés
     */
    getWordAvgLength(): number {
        let sum = 0;
        this.proposedWords.forEach(word => {
            sum += word.getLength();
        });
        return sum / this.getTryNumber();
    }
}
