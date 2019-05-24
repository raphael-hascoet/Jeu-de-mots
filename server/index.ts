import { Game } from './src/Game';

const app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', function(socket: any) {
    console.log('a user connected');
    socket.on('startGame', function(gameConfig: Game) {
        console.log('Game started with config :');
        console.log(JSON.stringify(gameConfig));
    });
});

const server = http.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});
