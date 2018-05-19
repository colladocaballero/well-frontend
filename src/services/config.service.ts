import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    apiUrl:string;

    constructor() {
        this.apiUrl = "http://localhost:57991"
    }

    getApiUrl():string {
        return this.apiUrl;
    }
}
