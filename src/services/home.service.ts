import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/User';
import { ConfigService } from '../services/config.service';

import { BehaviorSubject } from 'rxjs';
import { HttpResponseModel } from '../models/HttpResponseModel';

@Injectable()
export class HomeService {
    private _apiUrl:string;
    public userDetailsSubject:BehaviorSubject<User>;
    public userFriendsSubject:BehaviorSubject<User[]>;

    constructor(
        private _httpClient:HttpClient,
        private _configService:ConfigService
    ) {
        this._apiUrl = _configService.getApiUrl();
        this.userDetailsSubject = new BehaviorSubject<User>(null);
        this.userFriendsSubject = new BehaviorSubject<User[]>(null);
    }

    getUserDetails(userId:string):void {
        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type":"application/json", "Authorization":`Bearer ${localStorage.getItem("authToken")}`});

        this._httpClient.get(`${this._apiUrl}/home/${userId}`, {headers: httpHeaders})
            .subscribe(
                (response:HttpResponseModel) => this.userDetailsSubject.next(response.data)
            );
    }

    getFriends(userId:string):void {
        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type":"application/json", "Authorization":`Bearer ${localStorage.getItem("authToken")}`});

        this._httpClient.get(`${this._apiUrl}/home/${userId}/getfriends`, {headers: httpHeaders})
            .subscribe(
                (response:HttpResponseModel) => this.userFriendsSubject.next(response.data)
            );
    }
}
