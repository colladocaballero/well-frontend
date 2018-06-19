import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/User';
import { ConfigService } from '../services/config.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpResponseModel } from '../models/HttpResponseModel';
import { map } from 'rxjs/operators';
import { Photo } from '../models/Photo';

@Injectable()
export class HomeService {
    private _apiUrl:string;
    public userDetailsSubject:BehaviorSubject<User>;
    public userFriendsSubject:BehaviorSubject<User[]>;
    public userResultsSubject:BehaviorSubject<User[]>;
    public isOwnProfile:BehaviorSubject<boolean>;

    constructor(
        private _httpClient:HttpClient,
        private _configService:ConfigService
    ) {
        this._apiUrl = _configService.getApiUrl();
        this.userDetailsSubject = new BehaviorSubject<User>(null);
        this.userFriendsSubject = new BehaviorSubject<User[]>(null);
        this.userResultsSubject = new BehaviorSubject<User[]>(null);
        this.isOwnProfile = new BehaviorSubject<boolean>(null);
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

        this._httpClient.get(`${this._apiUrl}/home/${userId}/${localStorage.getItem("userId")}/getfriends`, {headers: httpHeaders})
            .subscribe(
                (response:HttpResponseModel) => this.userFriendsSubject.next(response.data)
            );
    }

    searchUsers(query:string):void {
        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type":"application/json", "Authorization":`Bearer ${localStorage.getItem("authToken")}`});

        this._httpClient.get(`${this._apiUrl}/home/search/${query}/${localStorage.getItem("userId")}`, {headers: httpHeaders})
            .subscribe(
                (response:HttpResponseModel) => this.userResultsSubject.next(response.data)
            );
    }

    changeProfilePicture(photo:Photo):Observable<HttpResponseModel> {
        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type":"application/json", "Authorization":`Bearer ${localStorage.getItem("authToken")}`});
        let body = {Id: photo.id, FileName: photo.fileName};

        return this._httpClient.put(`${this._apiUrl}/home/${localStorage.getItem("userId")}/changeprofilepicture`, JSON.stringify(photo), {headers: httpHeaders})
            .pipe(map(response => response as HttpResponseModel));
    }

    removeFriend(user2Id:string):Observable<HttpResponseModel> {
        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type":"application/json", "Authorization":`Bearer ${localStorage.getItem("authToken")}`});

        return this._httpClient.delete(`${this._apiUrl}/home/${localStorage.getItem("userId")}/${user2Id}`, {headers: httpHeaders})
            .pipe(map(response => response as HttpResponseModel));
    }
}
