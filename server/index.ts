import { Party } from './src/Party';

const app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', function(socket: any) {
    console.log('a user connected');
    socket.on('startGame', function(gameConfig: object) {
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
    let party = new Party(4);
});
