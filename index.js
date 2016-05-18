import {Server} from 'corona'
import {RoomController} from './app/controllers'
var app = require('http').createServer(handler);

var io = require('socket.io')(app);

app.listen(8080);
var server = new Server(io, {
  '/game': RoomController
})

const repl = require("repl");
var replServer = repl.start({
    prompt: "game > ",
});

replServer.context.game = game;
replServer.on('exit', () => process.exit())
