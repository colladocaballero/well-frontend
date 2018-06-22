import { Component } from '@angular/core';
import { Photo } from '../../../../models/Photo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../../../../services/config.service';

@Component({
    selector: 'carousel',
    templateUrl: 'carousel.component.html'
})

export class CarouselComponent {
    private _imagesUrl:string;
    private _photo:Photo;

    constructor(
        private _ngbActiveModal:NgbActiveModal,
        private _configService:ConfigService
    ) {
        this._imagesUrl = _configService.getImagesUrl();
    }


}
