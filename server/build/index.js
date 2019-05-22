"use strict";
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// io.on('connection', function(socket) {
//     console.log('a user connected');
//     socket.on('startGame', function(gameConfig) {});
// });
var server = http.listen(3000, function () {
    console.log('server is running on port', server.address().port);
});
