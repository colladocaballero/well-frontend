import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';

import { User } from '../models/User';
import { ConfigService } from '../services/config.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HomeService {
    private _apiUrl:string;

    constructor(
        private _httpClient:Http,
        private _configService:ConfigService
    ) {
        this._apiUrl = _configService.getApiUrl();
    }

    getUserDetails():Observable<{message:string}> {
        let headers = new Headers({"Content-Type":"application/json", "Authorization":`Bearer ${localStorage.getItem("auth_token")}`});

        return this._httpClient.get(`${this._apiUrl}/home/home/${localStorage.getItem("user_id")}`, {headers})
            .pipe(map(response => response.json()));
    }
}
