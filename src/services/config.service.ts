import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    private _apiUrl:string;
    private _imagesUrl:string;

    constructor() {
        this._apiUrl = "http://localhost:57991/api";
        this._imagesUrl = "http://localhost:57991/img";
    }

    getApiUrl():string {
        return this._apiUrl;
    }

    getImagesUrl():string {
        return this._imagesUrl;
    }
}
