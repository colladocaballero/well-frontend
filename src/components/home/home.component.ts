import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { User } from '../../models/User';
import { ConfigService } from '../../services/config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    private _userDetails:User;
    private _imagesUrl:string;
    private _unsub:Subject<void>;
    
    constructor(
        private _homeService:HomeService,
        private _configService:ConfigService
    ) {
        this._imagesUrl = _configService.getImagesUrl();
        this._unsub = new Subject();
        this.getUserDetails();
        _homeService.getUserDetails(localStorage.getItem("userId"));
    }

    getUserDetails():void {
        this._homeService.userDetailsSubject
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._userDetails = response
            );
    }

    ngOnDestroy() {
        this._unsub.next();
        this._unsub.complete();
    }
}
