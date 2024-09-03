"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const Room_1 = require("./Room");
const User_1 = require("./User");
const constants_1 = require("./constants");
class Manager {
    constructor() {
        this.Rooms = [];
        this.users = [];
    }
    addUser(username, socket, user_roomId) {
        const curr_room = this.Rooms.find((room) => user_roomId == room.roomId);
        if (!curr_room) {
            socket.send(JSON.stringify({
                type: constants_1.INVALID_GROUP,
                user_roomId
            }));
            return;
        }
        socket.send(JSON.stringify({
            type: constants_1.VALID_GROUP,
        }));
        const user = new User_1.User(username, socket, user_roomId);
        this.addHandler(user);
        this.users.push(user);
        curr_room.addUser(user);
    }
    removeUser(socket) {
        const curr_user = this.users.find((user) => socket === user.socket);
        const curr_room = this.Rooms.find((room) => room.roomId === (curr_user === null || curr_user === void 0 ? void 0 : curr_user.roomId));
        curr_room === null || curr_room === void 0 ? void 0 : curr_room.removeUser(curr_user);
        this.users.filter((user) => user !== curr_user);
    }
    addRoom(roomId) {
        const room = new Room_1.Room(roomId);
        this.Rooms.push(room);
        console.log("new room pushed");
    }
    getUsers(socket) {
        const curr_user = this.users.find((user) => socket === user.socket);
        if (!curr_user) {
            socket.send(JSON.stringify({
                type: constants_1.INVALID_USER,
            }));
        }
        const curr_room = this.Rooms.find((room) => room.roomId === (curr_user === null || curr_user === void 0 ? void 0 : curr_user.roomId));
        const curr_room_users = [curr_user === null || curr_user === void 0 ? void 0 : curr_user.username];
        curr_room === null || curr_room === void 0 ? void 0 : curr_room.users.forEach(user => {
            curr_room_users.push(user.username);
        });
        socket.send(JSON.stringify({
            type: constants_1.UPDATE_USERS,
            users: curr_room_users,
        }));
    }
    addHandler(user) {
        user.socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            switch (message.type) {
                case constants_1.CODE_SYNC:
                    break;
                case constants_1.UPDATE_USERS:
                    break;
            }
        });
    }
}
exports.Manager = Manager;
