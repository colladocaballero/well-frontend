import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/User';
import { ConfigService } from '../services/config.service';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponseModel } from '../models/HttpResponseModel';

@Injectable()
export class HomeService {
    private _apiUrl:string;
    public userDetails:BehaviorSubject<User>;

    constructor(
        private _httpClient:HttpClient,
        private _configService:ConfigService
    ) {
        this._apiUrl = _configService.getApiUrl();
        this.userDetails = new BehaviorSubject<User>(null);
    }

    getUserDetails():void {
        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type":"application/json", "Authorization":`Bearer ${localStorage.getItem("authToken")}`});

        this._httpClient.get(`${this._apiUrl}/home/home/${localStorage.getItem("userId")}`, {headers: httpHeaders})
            .subscribe(
                (response:HttpResponseModel) => this.userDetails.next(response.data)
            );
    }
}
