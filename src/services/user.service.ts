import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserRegistration } from '../models/UserRegistration';
import { ConfigService } from '../services/config.service';

import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponseModel } from '../models/HttpResponseModel';

@Injectable()
export class UserService {
    baseUrl:string;
    public authNavStatusSource:BehaviorSubject<boolean>;
    public isRequestingLogin:BehaviorSubject<boolean>;
    public isRequestingRegister:BehaviorSubject<boolean>;
    loggedIn:boolean = false;

    constructor(
        private _httpClient:HttpClient,
        private _configService:ConfigService
    ) {
        this.baseUrl = _configService.getApiUrl();
        this.authNavStatusSource = new BehaviorSubject<boolean>(false);
        this.isRequestingLogin = new BehaviorSubject<boolean>(false);
        this.isRequestingRegister = new BehaviorSubject<boolean>(false);
        this.loggedIn = !!localStorage.getItem("authToken");
    }

    register(email:string, password:string, name:string, surname:string, birthday:Date, gender:string):Observable<void> {
        let body = JSON.stringify({email, password, name, surname, birthday, gender});
        let headers = new HttpHeaders({"Content-Type":"application/json"});

        return this._httpClient.post(`${this.baseUrl}/register`, body, {headers: headers})
            .pipe(map((response:HttpResponseModel) => {
                if (response.statusCode == 201) {
                    localStorage.setItem("authToken", response.data.authToken);
                    localStorage.setItem("userId", response.data.id);
                    this.loggedIn = true;
                    this.authNavStatusSource.next(true);
                }
        }));
    }

    login(email:string, password:string) {
        let headers = new HttpHeaders({"Content-Type":"application/json"});

        return this._httpClient.post(`${this.baseUrl}/auth/login`, JSON.stringify({email, password}), {headers: headers})
            .pipe(map((response:HttpResponseModel) => {
                if (response.statusCode == 200) {
                    localStorage.setItem("authToken", response.data.authToken);
                    localStorage.setItem("userId", response.data.id);
                    this.loggedIn = true;
                    this.authNavStatusSource.next(true);
                }
            }));
    }

    logOut():void {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        this.loggedIn = false;
        this.authNavStatusSource.next(false);
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}
