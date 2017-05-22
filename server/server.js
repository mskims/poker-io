const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { getRandomElement } = require('./util');

http.listen(7778, function () {
    console.log('listening on *:7778');
});



class Broadcaster {
    sendWelcomeMessageToRoomUsers(room){

    }
}

class Robby {
    constructor() {
        this.games = [];
        this.users = [];
        this.usersEntity = {};

        this.rooms = [];
        this.roomCount = 0;
        this.roomsEntity = {};
    }

    addUser(user) {
        this.users.push(user);
    }

    addRoom(room) {
        room.id = ++this.roomCount;
        this.rooms.push(room);
        this.roomsEntity[room.id] = room;
    }

    getRoomByName(roomName) {
        return this.roomsEntity[roomName];
    }

    setDummyData() {
        /**
         * Helper Functions / Setup dummy datas
         */
        function createDummyUser(name) {
            return new User(name, name >>> 0, '0.0.0.0');
        }

        for (let name of ['주모', '주인장', '민식', '토요일']) {
            this.addUser(createDummyUser(name));
        }

        for (let roomNmae of ['테스트방', '마굿간', '민식이만', '아무나']) {
            const room = new Room(getRandomElement(this.users), roomNmae);
            this.addRoom(room);
        }
    }

    requestJoinUserToRoom(user, room) {
        let success = false, errorMessage = null;
        
        try {
            user.nowRoomId = room.id;
            room.joinUser(user);
            success = true;
        } catch (error) {
            errorMessage = error.message;
            console.log(errorMessage);
        }

        if (success) {
            user.socket.broadcast.emit('message', `${user.name} 님이 입장하셨습니다.`);
            user.socket.emit('joinRoomSuccess', user.nowRoomId)
            console.log(`[ROOM#${room.id}] ${user.name} 님이 입장하셨습니다.`);
        }else{
            // user.socket.emit('alert', errorMessage);
        }
    }
}

class Room {
    constructor(owner, title) {
        this.id = ++robby.roomCount;
        this.owner = owner;
        this.title = title;
        this.users = [owner];
    }
    joinUser(user) {
        this.users.push(user);
    }
}

class Game {
    constructor(room) {
        this.started = false;
    }

    start() {
        this.started = true;
    }
}

class User {
    constructor(name, socketId, ip) {
        this.name = name;
        this.id = socketId;
        this.ip = ip;
        this._nowRoomId = null;
    }
    get nowRoomId() {
        return this._nowRoomId;
    }
    set nowRoomId(newRoomId) {
        if (this._nowRoomId !== null) {
            throw Error('이미 접속중인 방이 있습니다. ');
        }
        this._nowRoomId = newRoomId;
    }

    clearRoomId() {
        this._nowRoomId = null;
    }
}


const robby = new Robby();

robby.setDummyData();
io.on('connection', function (socket) {
    const ip = socket.request.connection.remoteAddress;
    const me = new User(`User${new Date().getTime()}`, socket.id, ip);
    console.log(`${me.id} has Connected`);

    // Room
    socket.emit('roomList', robby.rooms);

    socket.on('joinRoom', function (roomNumber) {
        const room = robby.roomsEntity[roomNumber];
        robby.requestJoinUserToRoom(me, room);

        // roomsEntity[roomNumber].join(me);
    });

    // Game

    robby.addUser(me);
});


