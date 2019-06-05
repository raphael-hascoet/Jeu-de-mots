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

    socket.on('startGame', async function(gameConfig: any) {
        console.log('Game started with config :');
        console.log(JSON.stringify(gameConfig));

        Game.getInstance(
            new Player(gameConfig.hostName, gameConfig.hostTeam),
            gameConfig.gameDifficulty
        );
        await Game.getInstance().startGame();
        console.log(
            'hostName : ' +
                Game.getInstance()
                    .getHost()
                    .getName()
        );
        console.log(
            'hostTeam : ' +
                Game.getInstance()
                    .getHost()
                    .getTeam()
        );
        console.log(
            'difficultyLevel : ' + Game.getInstance().getDifficultyLevel()
        );
        console.log('Mot a trouver : ' + Game.getInstance().getWordToFind());
    });
    socket.on('proposition', function(msg: string) {
        console.log('Mot proposé :');
        console.log(msg);
        let score = calculateWordScore(Game.getInstance().getWordToFind(), msg);
        Game.getInstance().addProposedWord(msg, score);
        socket.emit('score', [
            msg,
            score.getcorrectPlace(),
            score.getcorrectLetter(),
        ]);

        if (msg == Game.getInstance().getWordToFind()) {
            socket.emit('fin');
        }
    });

    socket.on('getWords', function() {
        console.log('getWords');
        socket.emit('words', [Game.getInstance().getBestProposedWords(5)]);
    });

    socket.on('getMinimalDifficulty', function() {
        socket.emit('minDifficulty', gameConfiguration.getMinimalDifficulty());
    });

    socket.on('getMaximalDifficulty', function() {
        socket.emit('maxDifficulty', gameConfiguration.getMaximalDifficulty());
    });
});

const server = http.listen(3000, async () => {
    console.log('server is running on port', server.address().port);

    //Initialisation des niveaux de difficulté
    await gameConfiguration.calculLevelInterval();
});
