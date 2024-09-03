import { User } from "./User";

export class Room{

    roomId: string;
    users: User[];

    constructor(roomId: string){
        this.roomId = roomId;
        this.users = [];
    }

    addUser(user: User){
        this.users.push(user);
    }
    
    removeUser(user: User | undefined){
        if(user == undefined) return;
        this.users = this.users.filter((val) => val != user);
    }
}