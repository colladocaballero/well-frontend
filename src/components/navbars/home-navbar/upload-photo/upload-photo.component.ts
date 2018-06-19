import { Component } from '@angular/core';
import { PhotosService } from '../../../../services/photo.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'upload-photo',
    templateUrl: 'upload-photo.component.html'
})

export class UploadPhotoComponent {
    private _filesToUpload;
    private _fileName:string;

    constructor(
        private _photosService:PhotosService,
        private _ngbActiveModal:NgbActiveModal
    ) {
        this._fileName = "Elegir...";
    }

    fileChangeEvent(fileInput:any) {
        this._fileName = fileInput.target.files[0].name;
        this._filesToUpload = <Array<File>>fileInput.target.files;
    }

    uploadPhoto() {
        if (this._filesToUpload) {
            this._photosService.uploadPhoto(this._filesToUpload);
            this._photosService.getPhotos(localStorage.getItem("userId"));
            this._ngbActiveModal.close("Photo uploaded");
        }
    }
}
