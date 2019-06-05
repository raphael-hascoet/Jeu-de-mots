import { Game } from '../src/Game';
import { calculateWordScore } from '../src/gameUtils';
import { Player } from '../src/Player';
import { GameConfiguration } from './GameConfiguration';

const app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var gameConfiguration = new GameConfiguration();
gameConfiguration.calculLevelInterval();

io.on('connection', function(socket: any) {
    console.log('a user connected');

    /**
     * @userId Pseudonyme du joueur, relié au socket
     */
    var userId: string = 'Inconnu';

    var userIsHost = false;

    /**
     * Le premier utilisateur à se connecter deviens l'host et peut configurer la partie
     */
    socket.on('connectHost', function(hostName: string) {
        if (Game.hostIsConnected()) {
            console.log('ERREUR : hôte déjà connecté');
        } else if (Game.gameIsLaunched()) {
            console.log('ERREUR : la partie a déjà commencée');
        } else {
            io.emit('hostIsConnected', true);
            Game.getInstance(new Player(hostName));
            console.log('Hôte connecté sous le pseudonyme ' + hostName);
            userId = hostName;
            userIsHost = true;
            socket.emit('hostConnectionAllowed');
        }
    });

    /**
     * Le utilisateurs se connectants après l'host ne peuvent pas configurer la partie
     */
    socket.on('connectPlayer', function(playerName: string) {
        if (Game.gameIsLaunched()) {
            console.log('ERREUR : la partie a déjà commencée');
        } else if (Game.hostIsConnected()) {
        /**
         * Si la partie n'est pas commencée et que l'hôte est connecté
         * le joueur est ajouté et la liste des joueurs connectés est mise à jour
         */
            Game.getInstance().addPlayer(playerName);
            io.emit('connectedPlayers', Game.getInstance().getPlayers());
            console.log('Joueur connecté sous le pseudonyme ' + playerName);
            userId = playerName;
            socket.emit('playerConnectionAllowed');
        } else {
            console.log("ERREUR : l'hôte n'est pas connecté");
        }
    });

    socket.on('getHostIsConnected', function() {
        socket.emit('hostIsConnected', Game.hostIsConnected());
    });

    socket.on('getGameIsLaunched', function() {
        socket.emit('gameIsLaunched', Game.gameIsLaunched());
    });

    /**
     * Cette méthode retourne tous les joueurs de la partie, y compris l'host
     */
    socket.on('getConnectedPlayers', function() {
        socket.emit('connectedPlayers', Game.getInstance().getPlayers());
    });

    /**
     * Au lancement d'une partie
     *
     * @gameConfig contient le nom de l'hote créateur de la partie, le nom de l'équipe et le niveau de difficulté
     */
    socket.on('startGame', async function(gameConfig: any) {
        console.log('Game started with config :');
        console.log(JSON.stringify(gameConfig));

        if (gameConfig.hostName != '') {
            userId = gameConfig.hostName;
        }

        Game.getInstance(
            new Player(gameConfig.hostName),
            gameConfig.hostTeam,
            gameConfig.gameDifficulty
        );
        await Game.getInstance().startGame();
        console.log(
            'hostName : ' +
                Game.getInstance()
                    .getHost()
                    .getName()
        );
        console.log('Team : ' + Game.getInstance().getTeamName());
        console.log(
            'difficultyLevel : ' + Game.getInstance().getDifficultyLevel()
        );
        console.log('Mot a trouver : ' + Game.getInstance().getWordToFind());
    });

    /**
     * Proposition d'un mot par l'utilisateur
     *
     * @msg le mot proposé
     */
    socket.on('proposition', function(msg: string) {
        console.log('Mot proposé par ' + userId + ' :');
        console.log(msg);
        let score = calculateWordScore(Game.getInstance().getWordToFind(), msg);
        Game.getInstance().addProposedWord(msg, score);
        socket.emit('score', [
            msg,
            score.getcorrectPlace(),
            score.getcorrectLetter(),
        ]);

        if (msg == Game.getInstance().getWordToFind()) {
            io.emit('fin');
        }
    });

    socket.on('getAnswer', function() {
        socket.emit('answer', [Game.getInstance().getWordToFind()]);
    });

    /**
     * Récupération des meilleurs mots proposés
     */
    socket.on('getWords', function() {
        console.log('getWords');
        socket.emit('words', [Game.getInstance().getBestProposedWords(5)]);
    });

    /**
     * Récupération du niveau de difficulté minimal
     */
    socket.on('getMinimalDifficulty', function() {
        socket.emit('minDifficulty', gameConfiguration.getMinimalDifficulty());
    });

    /**
     * Récupération du niveau de difficulté maximal
     */
    socket.on('getMaximalDifficulty', function() {
        socket.emit('maxDifficulty', gameConfiguration.getMaximalDifficulty());
    });

    /**
     * Déconnexion de l'utilisateur
     */
    socket.on('disconnect', function() {

        Game.getInstance().removePlayer(userId);
        io.emit('connectedPlayers', Game.getInstance().getPlayers());

        if (userIsHost) {
            console.log('host ' + userId + ' disconnected');
            io.emit('hostIsConnected', false);

            if (Game.gameIsLaunched()) {
                console.log('configuration de la partie annulée');
                Game.resetInstance();
                io.emit('denyConfig');
            }
        } else {
            console.log(userId + ' disconnected');
        }
    });
});

const server = http.listen(3000, async () => {
    console.log('server is running on port', server.address().port);

    //Initialisation des niveaux de difficulté
    await gameConfiguration.calculLevelInterval();
});
