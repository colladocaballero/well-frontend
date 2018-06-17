import { User } from "./User";

export interface FriendRequest {
    id:number;
    user1Id:string;
    user2Id:string;
    date:Date;
    user1:User;
    user2:User;
}
