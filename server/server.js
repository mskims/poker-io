// const User = require('./components/User');
// const Robby = require('./components/Robby');
// const Broadcaster = require('./components/Broadcaster');



// class Game {
//     constructor(room) {
//         this.started = false;
//     }

//     start() {
//         this.started = true;
//     }
// }

// const broadcaster = new Broadcaster(io);
// const robby = new Robby(broadcaster);

// io.on('connection', function (socket) {
//     const ip = socket.request.connection.remoteAddress;
//     const me = new User(`User${new Date().getTime()}`, socket.id, ip);
//     console.log(`${me.id} has Connected`);

//     // Room
//     socket.emit('roomList', robby.rooms);

//     socket.on('joinRoom', function (roomNumber) {
//         const room = robby.roomsEntity[roomNumber];
//         robby.requestJoinUserToRoom(me, room);

//         // roomsEntity[roomNumber].join(me);
//     });

//     // Game

//     robby.addUser(me);
// });

const pokerApp = require('./app');
