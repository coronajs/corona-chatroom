/// <reference path="node_modules/corona/tsdist/index.d.ts" />
"use strict";
var corona_1 = require('corona');
var controllers_1 = require('./app/controllers');
var http = require('http');
var SocketIO = require('socket.io');
var repl = require("repl");
var app = http.createServer(handler);
var io = SocketIO(app);
app.listen(8080);
var server = new corona_1.Server(io, {
    '/game': controllers_1.RoomController
});
var replServer = repl.start({
    prompt: "game > ",
});
replServer.context.game = game;
replServer.on('exit', function () { return process.exit(); });
