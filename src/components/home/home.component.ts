import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { User } from '../../models/User';
import { ConfigService } from '../../services/config.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    private _userDetails:User;
    private _userDetailsSub:Subscription;
    private _imagesUrl:string;
    
    constructor(
        private _homeService:HomeService,
        private _configService:ConfigService
    ) {
        this._imagesUrl = _configService.getImagesUrl();
        this._userDetailsSub = this.getUserDetails();
    }

    getUserDetails():Subscription {
        return this._homeService.getUserDetails().subscribe(userDetails => this._userDetails = userDetails);
    }

    ngOnDestroy() {
        this._userDetailsSub.unsubscribe();
    }
}
