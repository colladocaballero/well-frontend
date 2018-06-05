import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { HttpResponseModel } from '../models/HttpResponseModel';

@Injectable()
export class CommentsService {
    private _apiUrl:string;
    public comments:BehaviorSubject<Comment[]>;
    public isSending:BehaviorSubject<boolean>;

    constructor(
        private _configService:ConfigService,
        private _httpClient:HttpClient
    ) {
        this._apiUrl = _configService.getApiUrl();
        this.comments = new BehaviorSubject<Comment[]>([]);
        this.isSending = new BehaviorSubject<boolean>(false);
    }

    getWallComments(userId:string):void {
        this._httpClient.get(`${this._apiUrl}/comments/${userId}`).subscribe(
            (response:HttpResponseModel) => this.comments.next(response.data.value)
        );
    }

    addNewComment(userId:string, text:string, date:string):Observable<HttpResponseModel> {
        this.isSending.next(true);

        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});
        return this._httpClient.post(`${this._apiUrl}/comments`, {userId: userId, text: text, date: date}, {headers: httpHeaders})
            .pipe(map((response:HttpResponseModel) => response));
    }
}
