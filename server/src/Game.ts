import fs from 'fs';
import { latinise } from './stringUtil';
import { Player } from './Player';
import { ProposedWord } from './ProposedWord';
import { Score } from './Score';
import { Timer } from './Timer';

/**
 * Classe comprenant toutes les méthodes nécessaires à la gestion d'une partie
 */
export class Game {
    
    private static instance: Game;

    /**
     * Méthode du design pattern singleton, permet de créer ou de récupérer la partie jouée sur le serveur
     *
     * @param host hébergeur de la partie, remplir pour créer une nouvelle partie
     * @param difficulty  difficulté de la partie, remplir pour créer une nouvelle partie
     *
     */
    static getInstance(
        host = new Player('null'),
        teamName = '',
        difficulty = -1
    ): Game {
        if (!Game.instance || host.getName() != 'null') {
            Game.instance = new Game(host, teamName, difficulty);
        }

        if(difficulty!=-1){
            Game.instance.difficultyLevel = difficulty;
        }

        return Game.instance;
    }

    static hostIsConnected(): boolean{
        return this.getInstance().getHost().getName()!='null';
    }

    static gameIsLaunched(): boolean{
        return this.getInstance().difficultyLevel!=-1;
    }

    static resetInstance(): void{
        this.instance.host = new Player('null');
        this.instance.difficultyLevel = -1;
    }

    /**
     * Hebergeur de la partie
     * 
     * @name = 'null' si il y n'y a pas d'host connecté
     */
    private host: Player;

    /**
     * Nom de l'équipe jouant cette partie
     */
    private teamName : string;

    /**
     * Liste des joueurs de la partie
     */
    private players: Array<Player> = Array<Player>();

    /**
     * Niveau de difficulté de la partie
     * 
     * @valeur = -1 s'il n'y a pas de partie de lancée
     */
    private difficultyLevel: number;
    /**
     * Liste des mots proposés par les joueurs
     */
    private proposedWords: Array<ProposedWord>;
    /**
     * Mot que les joueurs doivent trouver
     */
    private wordToFind = '';
    /**
     * Temps passé par l'équipe à chercher le mot
     */
    private timer: Timer;

    /**
     * Constructeur d'une partie
     */
    private constructor(host: Player, teamName: string, difficultyLevel: number) {
        this.host = host;
        this.players = new Array<Player>();
        this.players.push(this.host);
        this.teamName = teamName;
        this.difficultyLevel = difficultyLevel;
        this.proposedWords = new Array<ProposedWord>();
        this.timer = new Timer();
    }

    public addPlayer(playerName : string){
        this.players.push(new Player(playerName));
    }

    public removePlayer(playerName : string){
        this.players = this.players.filter(player => player.getName().localeCompare(playerName)!=0);
    }

    /**
     * Méthode permettant de démarrer le jeu.
     * Permet d'attendre que le mot dans le dictionnaire soit trouvé (méthode readDictionnary)
     * avant de continuer : à appeler dans une méthode 'async' en faisant
     * await Game.getInstance().startGame();
     * @param socket - Socket de connexion avec le client
     */
    public startGame(socket: any) {
        this.timer.startTimer(socket);
        return this.readDictionnary().then(
            data => {
                this.wordToFind = data;
            },
            error => {
                throw new Error(error);
            }
        );
    }

    /**
     * Méthode permettant d'arrêter le jeu (ici elle arrête le timer)
     */
    public stopGame() {
        this.timer.stopTimer();
    }

    /**
     * Méthode permettant de trouver un mot dans le dictionnaire pour démarrer une partie
     */
    async readDictionnary(): Promise<string> {
        let difficulty = this.difficultyLevel;
        if (difficulty == 0) {
            //if(difficulty < gameConfiguration.getMinimalDifficulty() || difficulty > gameConfiguration.getMaximalDifficulty())
            //ligne ci-dessus à décommenter dans tout sera mis en place
            throw new Error("La difficulté n'est pas valide.");
        }
        let word = '';
        return new Promise(
            (resolve, reject): void => {
                fs.readFile(
                    'resources/liste_francais.txt',
                    'utf8',
                    (err, data) => {
                        if (err) throw err;
                        let words: string[] = data.toString().split('\n');
                        while (
                            word.length != difficulty ||
                            word.includes('-')
                        ) {
                            let random: number = Math.floor(
                                Math.random() * words.length
                            );
                            word = words[random].trim();
                        }
                        word = latinise(word.toLocaleLowerCase());
                        resolve(word);
                    }
                );
            }
        );
    }

    getWordToFind(): string {
        return this.wordToFind;
    }

    getHost(): Player {
        return this.host;
    }

    getTeamName(): string {
        return this.teamName;
    }

    getDifficultyLevel(): number {
        return this.difficultyLevel;
    }

    getPlayers(): Player[] {
        return this.players;
    }

    /**
     * Méthode permettant d'ajouter un mot à la liste des mots proposés
     * @param word - Mot à ajouter
     * @param score - Score correspondant à ce mot (dépend du mot à trouver)
     */
    addProposedWord(word: string, score: Score) {
        this.proposedWords.push(new ProposedWord(word, score));
    }

    /**
     * Méthode permettant de récupérer la liste des nb meilleurs mots proposés (en fonction de leur score)
     * @param nb - Nombre de mots à récupérer
     */
    getBestProposedWords(nb: number): Array<ProposedWord> {
        let sortedWords: Array<ProposedWord> = this.proposedWords;
        sortedWords.sort((a, b) => {
            return b.getScore().getTotalScore() - a.getScore().getTotalScore();
        });
        let wordsToReturn = new Array<ProposedWord>();
        for (let i = 0; i < nb && i < sortedWords.length; i++) {
            wordsToReturn.push(sortedWords[i]);
        }
        return wordsToReturn;
    }
}
