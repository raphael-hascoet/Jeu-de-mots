const app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// io.on('connection', function(socket) {
//     console.log('a user connected');
//     socket.on('startGame', function(gameConfig) {});
// });

const server = http.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});
