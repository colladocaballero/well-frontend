import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    private _apiUrl:string;

    constructor() {
        this._apiUrl = "http://localhost:57991/api"
    }

    getApiUrl():string {
        return this._apiUrl;
    }
}
