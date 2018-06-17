import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FriendRequest } from '../models/FriendRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { HttpResponseModel } from '../models/HttpResponseModel';

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
}
