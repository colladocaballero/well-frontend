import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserRegistration } from '../models/UserRegistration';
import { ConfigService } from '../services/config.service';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
    baseUrl:string;
    authNavStatusSource;
    authNavStatus;
    loggedIn:boolean = false;

    constructor(
        private _http:Http,
        private _configService:ConfigService
    ) {
        this.baseUrl = _configService.getApiUrl();
        this.authNavStatusSource = new BehaviorSubject<boolean>(false);
        this.authNavStatusSource.next(this.loggedIn);
        this.authNavStatus = this.authNavStatusSource.asObservable();
        this.loggedIn = !!localStorage.getItem("auth_token");
    }

    register(email:string, password:string, name:string, surname:string, birthday:Date, gender:string) {
        let body = JSON.stringify({email, password, name, surname, birthday, gender});
        let headers = new Headers({"Content-Type":"application/json"});

        return this._http.post(`${this.baseUrl}/register`, body, {headers: headers}).pipe(map((response:any) => true));
    }

    login(email:string, password:string) {
        let headers = new Headers({"Content-Type":"application/json"});

        return this._http.post(`${this.baseUrl}/auth/login`, JSON.stringify({email, password}), {headers: headers})
            .pipe(map((response:any) => response.json()))
            .pipe(map((response:any) => {
                localStorage.setItem("auth_token", response.auth_token);
                this.loggedIn = true;
                this.authNavStatusSource.next(true);
                return true;
            }));
    }

    logOut():void {
        localStorage.removeItem("auth_token");
        this.loggedIn = false;
        this.authNavStatusSource.next(false);
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}
