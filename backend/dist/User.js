"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(username, socket, roomId) {
        this.roomId = roomId;
        this.socket = socket;
        this.username = username;
    }
}
exports.User = User;
