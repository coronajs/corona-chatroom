
/// <reference path="node_modules/corona/tsdist/index.d.ts" />

import {Server} from 'corona'
import {RoomController} from './app/controllers'
import http = require('http')
import SocketIO = require('socket.io');
import repl = require("repl");


var  app = http.createServer(handler);

var io = SocketIO(app);

app.listen(8080);
var server = new Server(io, {
  '/game': RoomController
})


var replServer = repl.start({
    prompt: "game > ",
});

replServer.context.game = game;
replServer.on('exit', () => process.exit())
