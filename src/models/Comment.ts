export interface Comment {
    id:number;
    text:string;
    date:Date;
    likes:number;
    userId:string;
    photoId?:number;
    parentCommentId?:number;
}
