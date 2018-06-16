import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PhotosService } from '../../../services/photo.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { HomeService } from '../../../services/home.service';

@Component({
    selector: 'home-navbar',
    templateUrl: 'home-navbar.component.html'
})

export class HomeNavbarComponent {
    public filesToUpload;

    constructor(
        private _userService:UserService,
        private _photosService:PhotosService,
        private _configService:ConfigService,
        private _homeService:HomeService,
        private _router:Router
    ) {}

    fileChangeEvent(fileInput:any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    addPhoto() {
        if (this.filesToUpload) {
            this._photosService.uploadPhoto(this.filesToUpload);
            this._photosService.getPhotos(localStorage.getItem("userId"));
        }
    }

    showProfile():void {
        if (this._router.url == "/profile") {
            this._homeService.getUserDetails(localStorage.getItem("userId"));
            this._homeService.getFriends(localStorage.getItem("userId"));
        } else {
            localStorage.setItem("actualUser", localStorage.getItem("userId"));
            this._router.navigate(['profile']);
        }
    }

    logOut():void {
        this._userService.logOut();
    }
}
