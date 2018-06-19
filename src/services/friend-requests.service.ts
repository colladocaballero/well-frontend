import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FriendRequest } from '../models/FriendRequest';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigService } from './config.service';
import { HttpResponseModel } from '../models/HttpResponseModel';
import { map } from 'rxjs/operators';

@Injectable()
export class FriendRequestsService {
    private _apiUrl:string;
    public friendRequestsSubject:BehaviorSubject<FriendRequest[]>;
    public requestsCountSubject:BehaviorSubject<number>;

    constructor(
        private _configService:ConfigService,
        private _httpClient:HttpClient
    ) {
        this._apiUrl = _configService.getApiUrl();
        this.friendRequestsSubject = new BehaviorSubject<FriendRequest[]>([]);
        this.requestsCountSubject = new BehaviorSubject<number>(0);
    }

    getUserFriendRequests():void {
        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});
        this._httpClient.get(`${this._apiUrl}/friendrequests/${localStorage.getItem("userId")}`, {headers: httpHeaders})
            .subscribe(
                (response:HttpResponseModel) => {
                    this.friendRequestsSubject.next(response.data.friendRequests);
                    this.requestsCountSubject.next(response.data.requestsCount);
                }
            );
    }

    sendFriendRequest(user2Id:string):Observable<HttpResponseModel> {
        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});
        return this._httpClient.post(`${this._apiUrl}/friendrequests`, {user1Id: localStorage.getItem("userId"), user2Id: user2Id}, {headers: httpHeaders})
            .pipe(map(response => response as HttpResponseModel));
    }

    acceptFriendRequest(friendRequest:FriendRequest):Observable<HttpResponseModel> {
        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});
        return this._httpClient.post(`${this._apiUrl}/friendrequests/acceptfriendrequest`, JSON.stringify(friendRequest), {headers: httpHeaders})
            .pipe(map(response => response as HttpResponseModel));
    }

    rejectFriendRequest(id:number):Observable<HttpResponseModel> {
        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});
        return this._httpClient.delete(`${this._apiUrl}/friendrequests/${id}`, {headers: httpHeaders})
            .pipe(map(response => response as HttpResponseModel));
    }
}
