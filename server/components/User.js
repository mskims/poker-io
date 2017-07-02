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

module.exports = User;
