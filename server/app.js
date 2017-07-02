const app = require('express')();
const http = require('http').Server(app);
const socketio = require('socket.io');

class PokerApp {
    constructor() {

    }
    run(port = 7778) {
        http.listen(port, function () {
            console.log(`Listening on *:${port}`);
        });
        const io = socketio(http);
        this.io = io;

        io.on('connection', this.onConnection);
    }
    onConnection(socket) {
        console.log(socket.id);
    }
}

const pokerApp = new PokerApp();
pokerApp.run();

module.exports = pokerApp;
