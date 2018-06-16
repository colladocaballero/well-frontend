import { Component } from '@angular/core';
import { PhotosService } from '../../../services/photo.service';
import { ConfigService } from '../../../services/config.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Photo } from '../../../models/Photo';

@Component({
	selector: 'gallery',
	templateUrl: './gallery.component.html',
	styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
	private _url:string;
	private _urlImage:string;
	private _unsub:Subject<void>;
	private _photos:Photo[];

	constructor(
		private _photosService:PhotosService,
		private _configService:ConfigService,
		private _httpClient:HttpClient
	) {
		this._url = _configService.getApiUrl();
		this._urlImage = _configService.getImagesUrl();
		this._unsub = new Subject();
	}

	ngOnInit(){
		this.getImages();
	}

    getImages(){
		this._photosService.getPhotos(localStorage.getItem("actualUser"));
		this._photosService.photos
			.pipe(takeUntil(this._unsub))
			.subscribe(
				response => this._photos = response
			);
    }

    ngOnDestroy(){
		this._unsub.next();
		this._unsub.complete();
    }
}
