import { User } from "./User";

export interface Message {
    id:number;
    title:string;
    text:string;
    userTransmitterId:string;
    userReceiverId:string;
    status:string;
    date:Date;
    userTransmitter:User;
    userReceiver:User;
}
