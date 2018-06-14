import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/Message';
import { HttpResponseModel } from '../models/HttpResponseModel';
import { map } from 'rxjs/operators';

@Injectable()
export class MessagesService {
    private _apiUrl:string;
    public messagesSub:BehaviorSubject<Message[]>;
    public unreadMessagesCount:BehaviorSubject<number>;
    public showMessage:BehaviorSubject<boolean>;
    public isDeleting:BehaviorSubject<boolean>;

    constructor(
        private _configService:ConfigService,
        private _httpClient:HttpClient
    ) {
        this._apiUrl = _configService.getApiUrl();
        this.messagesSub = new BehaviorSubject<Message[]>([]);
        this.unreadMessagesCount = new BehaviorSubject<number>(0);
        this.showMessage = new BehaviorSubject<boolean>(false);
        this.isDeleting = new BehaviorSubject<boolean>(false);
    }

    getUserMessages(userId:string):void {
        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});
        this._httpClient.get(`${this._apiUrl}/messages/${userId}`, {headers: httpHeaders})
            .subscribe(
                (response:HttpResponseModel) => {
                    this.messagesSub.next(response.data.messages);
                    this.unreadMessagesCount.next(response.data.unreadCount)
                }
            );
    }

    sendMessage(title:string, text:string, userTransmitterId:string, receiversIds:string[]):Observable<HttpResponseModel> {
        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});
        let body = {
            Title: title,
            Text: text,
            UserTransmitterId: userTransmitterId,
            ReceiversIds: receiversIds
        };
        return this._httpClient.post(`${this._apiUrl}/messages`, body, {headers: httpHeaders})
            .pipe(map(response => response as HttpResponseModel));
    }

    markAsRead(messageId:number):Observable<HttpResponseModel> {
        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});
        return this._httpClient.put(`${this._apiUrl}/Messages/${messageId}/MarkAsRead`, {}, {headers: httpHeaders})
            .pipe(map(response => response as HttpResponseModel));
    }

    markAsUnread(messageId:number):Observable<HttpResponseModel> {
        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});
        return this._httpClient.put(`${this._apiUrl}/Messages/${messageId}/MarkAsUnread`, {}, {headers: httpHeaders})
            .pipe(map(response => response as HttpResponseModel));
    }

    deleteMessage(messageId:number):Observable<HttpResponseModel> {
        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});
        return this._httpClient.delete(`${this._apiUrl}/messages/${messageId}`, {headers: httpHeaders})
            .pipe(map(response => response as HttpResponseModel));
    }
}
