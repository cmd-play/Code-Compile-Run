import { WebSocket } from "ws";

export class User {
  username: string;
  socket: WebSocket;
  roomId: string;

  constructor(username: string, socket: WebSocket, roomId: string) {
    this.roomId = roomId;
    this.socket = socket;
    this.username = username;
  }
}
