import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { ConfigService } from './config.service';
import { HttpResponseModel } from '../models/HttpResponseModel';
import { BehaviorSubject } from 'rxjs';
import { Photo } from '../models/Photo';

@Injectable()
export class PhotosService {
    public photos:BehaviorSubject<Photo[]>;
    public url:string;
    constructor(
        private _http:HttpClient,
        private _configservice:ConfigService
    ) {
        this.url =_configservice.getApiUrl();
        this.photos = new BehaviorSubject<Photo[]>([]);
    }

    uploadPhoto(files:Array<File>) {
        return new Promise((resolve, reject) => {
            var formData:any = new FormData();
            var xhr = new XMLHttpRequest();
            
            for (var i = 0; i < files.length; i++) {
                formData.append('image', files[i], files[i].name);
            }

            formData.append("userId",localStorage.getItem("userId"));

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 201) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(JSON.parse(xhr.response));
                    }
                }
            };

            xhr.open('POST',this.url+"/Photos", true);
            xhr.send(formData);
        });
    }

    getPhotos(userId:string):void {
        let httpHeaders:HttpHeaders = new HttpHeaders({"Content-Type":"application/json", "Authorization":`Bearer ${localStorage.getItem("authToken")}`});

        this._http.get(`${this.url}/photos/${userId}`, {headers: httpHeaders})
            .subscribe(
                (response:HttpResponseModel) => this.photos.next(response.data)

            );
    }
}