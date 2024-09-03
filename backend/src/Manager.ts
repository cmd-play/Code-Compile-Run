import WebSocket from "ws";
import { Room } from "./Room";
import { User } from "./User";
import { CODE_SYNC, INVALID_GROUP, INVALID_USER, UPDATE_USERS, VALID_GROUP } from "./constants";

export class Manager {
  private Rooms: Room[];
  private users: User[];

  constructor() {
    this.Rooms = [];
    this.users = [];
  }

  addUser(username: string, socket: WebSocket, user_roomId: string) {
    
    const curr_room = this.Rooms.find((room) => user_roomId == room.roomId);
    if(!curr_room){
      socket.send(
        JSON.stringify({
          type: INVALID_GROUP,
          user_roomId
        })
      );
      return;
    }

    socket.send(
      JSON.stringify({
        type: VALID_GROUP,
      })
    );

    const user = new User(username, socket, user_roomId);
    this.addHandler(user);
    this.users.push(user);
    curr_room.addUser(user);
  }

  removeUser(socket: WebSocket){
    const curr_user = this.users.find((user) => socket === user.socket);
    const curr_room = this.Rooms.find((room) => room.roomId === curr_user?.roomId);
    curr_room?.removeUser(curr_user);
    this.users.filter((user) => user!==curr_user);
  }

  addRoom(roomId: string) {
    const room = new Room(roomId);
    this.Rooms.push(room);
    console.log("new room pushed");
  }

  getUsers(socket: WebSocket){
    const curr_user = this.users.find((user) => socket === user.socket);
    if(!curr_user){
      socket.send(
        JSON.stringify({
          type: INVALID_USER,
        })
      );
    }

    const curr_room = this.Rooms.find((room) => room.roomId === curr_user?.roomId);
    const curr_room_users = [curr_user?.username];
    curr_room?.users.forEach(user => {
      curr_room_users.push(user.username);  
    });

    socket.send(
      JSON.stringify({
        type: UPDATE_USERS,
        users: curr_room_users,
      })
    )
  }

  private addHandler(user : User) {

    user.socket.on("message", (data) => {
      const message = JSON.parse(data.toString());     
      switch (message.type){
        case CODE_SYNC:
          break;
        case UPDATE_USERS:
          break;
      }
    });
  }
}
