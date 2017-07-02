const User = require('./User');
const Room = require('./Room');
const { getRandomElement } = require('../util');

class Robby {
    constructor() {
        this.games = [];
        this.users = [];
        this.usersEntity = {};

        this.rooms = [];
        this.roomCount = 0;
        this.roomsEntity = {};

        this.broadcaster = broadcaster;

        this._setDummyData();
    }

    addUser(user) {
        this.users.push(user);
        this.usersEntity[user.id] = user;
    }

    addRoom(room) {
        this.rooms.push(room);
        this.roomsEntity[room.id] = room;
    }

    getRoomByName(roomName) {
        return this.roomsEntity[roomName];
    }

    _setDummyData() {
        /**
         * Helper Functions / Setup dummy datas
         */
        function createDummyUser(name) {
            return new User(name, `ID${name}`, '0.0.0.0');
        }

        for (let name of ['주모', '주인장', '민식', '토요일']) {
            this.addUser(createDummyUser(name));
        }

        for (let roomNmae of ['테스트방', '마굿간', '민식이만', '아무나']) {
            const room = new Room(++this.roomCount, getRandomElement(this.users).id, roomNmae);
            this.addRoom(room);
        }
    }

    requestJoinUserToRoom(user, room) {
        let success = false, errorMessage = null;
        
        try {
            this.broadcaster.joinUserToRoom(user, room);

            room.join(user);
            user.nowRoomId = room.id;
            success = true;
        } catch (error) {
            errorMessage = error.message;
            this.broadcaster.sendMessageToUser(user.id, errorMessage);
            console.log(errorMessage);
        }

        if (success) {
            this.broadcaster.sendMessageToUser(user.id, `${user.name} 님이 입장하셨습니다.`);
            // user.socket.broadcast.emit('message', `${user.name} 님이 입장하셨습니다.`);
            // user.socket.emit('joinRoomSuccess', user.nowRoomId);
            // console.log(`[ROOM#${room.id}] ${user.name} 님이 입장하셨습니다.`);
        }else{
            
            // user.socket.emit('alert', errorMessage);
        }
    }
}

module.exports = Robby;
