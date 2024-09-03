"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
class Room {
    constructor(roomId) {
        this.roomId = roomId;
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
    }
    removeUser(user) {
        if (user == undefined)
            return;
        this.users = this.users.filter((val) => val != user);
    }
}
exports.Room = Room;
