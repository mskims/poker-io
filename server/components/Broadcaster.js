
class Broadcaster {
    constructor(io){
        this.io = io;
        this.ns =io.of('/');
    }
    sendMessageToUser(userId, message){
        this.io.to(userId.id).emit('message', message);
    }
    sendMessageToUsers(){

    }
    sendMessageToRoom(){
        // this.io.to();
    }
    sendMessageToAll(){

    }

    getSocketByUserId(userId){
        return this.ns.connected[userId];
    }

    joinUserToRoom(userId, roomId){
        this.getSocketByUser(userId).join(roomId);
    }
}

module.exports = Broadcaster;
