"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const Manager_1 = require("./Manager");
const constants_1 = require("./constants");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const manager = new Manager_1.Manager();
wss.on("connection", function connection(ws) {
    console.log("Player Connected");
    ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        if (message.type === constants_1.NEW_GROUP) {
            console.log("New room created : ", message.roomId);
            manager.addRoom(message.roomId);
        }
        if (message.type === constants_1.JOIN_GROUP)
            manager.addUser(message.username, ws, message.roomId);
        if (message.type === constants_1.GET_USERS)
            manager.getUsers(ws);
    });
    ws.on("disconnect", () => {
        console.log("Player disconnected");
    });
});
