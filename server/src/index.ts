import { Game } from '../src/Game';
import { calculateWordScore } from '../src/gameUtils';
import { Player } from '../src/Player';
import { GameConfiguration } from './GameConfiguration';
import { Lobby } from './Lobby';
import { getStatNbLetter, getChronology, getGameStats } from './statsUtils';
import { Badge } from './Badge';

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

    var teamName = '';
    var gameDifficulty = 1;

    /**
     * Le premier utilisateur à se connecter deviens l'host et peut configurer la partie
     * les suivants peuvent voir la config en cours mais pas la modifier
     */
    socket.on('connectUser', function(userName: string) {
        if (Game.gameIsLaunched()) {
            console.log('ERREUR : la partie a déjà commencée');
        } else if (Lobby.hostIsConnected()) {
            /**
             * Si l'host est déjà connecté, on rajoute uniquement cet utilisateur au lobby
             */
            userId = userName;
            Lobby.getInstance().addPlayer(userId);
            io.emit('connectedPlayers', Lobby.getInstance().getPlayers());
            console.log('Joueur connecté sous le pseudonyme ' + userId);
        } else {
            /**
             * Si c'est le premier utilisateur à se connecter, le lobby est créé et il en devient l'host
             */
            io.emit('hostIsConnected', true);
            userId = userName;
            Lobby.createLobby(userId);
            io.emit('connectedPlayers', Lobby.getInstance().getPlayers());
            console.log('Hôte connecté sous le pseudonyme ' + userId);
            userIsHost = true;
            socket.emit('hostConnectionAllowed');
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
        socket.emit('connectedPlayers', Lobby.getInstance().getPlayers());
    });

    socket.on('isUserHost', function() {
        socket.emit('userIsHost', userIsHost);
    });

    socket.on('updateTeamName', function(newTeamName: string) {
        teamName = newTeamName;
        io.emit('teamName', teamName);
    });

    socket.on('getTeamName', function() {
        socket.emit('teamName', teamName);
    });

    socket.on('updateGameDifficulty', function(newGameDifficulty: number) {
        gameDifficulty = newGameDifficulty;
        io.emit('gameDifficulty', gameDifficulty);
    });

    socket.on('getGameDifficulty', function() {
        socket.emit('gameDifficulty', gameDifficulty);
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

        io.emit('gameIsLaunched', Game.gameIsLaunched());
    });

    /**
     * Proposition d'un mot par l'utilisateur
     *
     * @msg le mot proposé
     */
    socket.on('proposition', function(msg: string) {
        console.log('Mot proposé par ' + userId + ' :');
        console.log(msg);
        let player = Game.getInstance().getPlayer(userId);
        let score = calculateWordScore(Game.getInstance().getWordToFind(), msg);
        Game.getInstance().addProposedWord(msg, score, player);
        Game.getInstance().calculatePlayerScore(player, msg);
        io.emit('score', [
            userId + ' a proposé ' + msg,
            score.getcorrectPlace(),
            score.getcorrectLetter(),
        ]);

        if (msg == Game.getInstance().getWordToFind()) {
            player.setBadge(Badge.CHAMPION);
            socket.emit('fin');
            socket.emit('nbLetters', [getStatNbLetter()]);
            socket.emit('chronology', [getChronology()]);
            socket.emit('gameStats', [getGameStats()]);
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
        Lobby.getInstance().removePlayer(userId);
        io.emit('connectedPlayers', Lobby.getInstance().getPlayers());

        if (userIsHost) {
            console.log('host ' + userId + ' disconnected');
            io.emit('hostIsConnected', false);
            Lobby.resetInstance();

            if (!Game.gameIsLaunched()) {
                console.log('configuration de la partie annulée');
                io.emit('denyConfig');
            } else {
                console.log("L'host s'est déconnecté pendant la partie");
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
