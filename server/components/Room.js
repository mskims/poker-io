class Room {
    constructor(id, ownerId, title) {
        console.log(ownerId);
        this.id = id;
        this.owner = ownerId;
        this.title = title;
        this.users = [ownerId];
    }
    join(userId){
        this.users.push(userId);
    }
}

module.exports = Room;
