import { Game } from './src/Game';
import { calculateWordScore } from './src/gameUtils';

const app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', function(socket: any) {
    console.log('a user connected');

    socket.on('startGame', function(gameConfig: Game) {
        console.log('Game started with config :');
        console.log(JSON.stringify(gameConfig));
    });
    socket.on('proposition', function(msg: string) {
        console.log('Mot proposé :');
        console.log(msg);
        socket.emit('score', '0');
    });
});

const server = http.listen(3000, () => {
    console.log('server is running on port', server.address().port);

    console.log(calculateWordScore('boom', 'bimbamboom'));
    console.log(calculateWordScore('bim', 'biim'));
    console.log(calculateWordScore('', 'rien'));
});
