import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeService } from '../../../services/home.service';
import { Photo } from '../../../models/Photo';
import { PhotosService } from '../../../services/photo.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ConfigService } from '../../../services/config.service';

@Component({
    selector: 'change-profile-picture',
    templateUrl: 'change-profile-picture.component.html'
})

export class ChangeProfilePictureComponent {
    private _photos:Photo[];
    private _unsub:Subject<void>;
    private _imagesUrl:string;

    constructor(
        private _ngbActiveModal:NgbActiveModal,
        private _photosService:PhotosService,
        private _homeService:HomeService,
        private _configService:ConfigService
    ) {
        this._photos = [];
        this._unsub = new Subject();
        this._imagesUrl = _configService.getImagesUrl();
    }

    ngOnInit() {
        this.getPhotos();
    }
    
    getPhotos():void {
        this._photosService.getPhotos(localStorage.getItem("userId"));
        this._photosService.photos
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._photos = response
            );
    }

    changeProfilePicture(photo:Photo):void {
        this._homeService.changeProfilePicture(photo)
            .subscribe(
                response => {
                    this._homeService.getUserDetails(localStorage.getItem("userId"));
                    this._ngbActiveModal.close("Profile picture updated");
                }
            );
    }
}
