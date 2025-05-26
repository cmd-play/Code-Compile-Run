import { WebSocketServer } from "ws";
import { Manager } from "./Manager";
import { GET_USERS, JOIN_GROUP, NEW_GROUP } from "./constants";

const wss = new WebSocketServer({ port: 8080 });


const manager = new Manager();

wss.on("connection", function connection(ws) {
  console.log("Player Connected");

  ws.on('message', (data) => {
    const message = JSON.parse(data.toString());
    if(message.type === NEW_GROUP) {console.log("New room created : ", message.roomId); manager.addRoom(message.roomId);}
    if(message.type === JOIN_GROUP) manager.addUser(message.username, ws, message.roomId);
    if(message.type === GET_USERS) manager.getUsers(ws);
  })
  ws.on("disconnect", () => {
    console.log("Player disconnected");
  });

});