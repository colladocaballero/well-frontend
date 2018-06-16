import { Component } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { User } from '../../../models/User';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigService } from '../../../services/config.service';
import { Router } from '@angular/router';

@Component({
    selector: 'friends',
    templateUrl: 'friends.component.html',
    styleUrls: ['friends.component.css']
})

export class FriendsComponent {
    private _friends:User[];
    private _unsub:Subject<void>;
    private _imagesUrl:string;

    constructor(
        private _homeService:HomeService,
        private _configService:ConfigService,
        private _router:Router
    ) {
        this._friends = [];
        this._unsub = new Subject();
        this._imagesUrl = _configService.getImagesUrl();
    }

    ngOnInit() {
        this.getFriends();
    }

    getFriends():void {
        this._homeService.getFriends(localStorage.getItem("actualUser"));
        this._homeService.userFriendsSubject
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._friends = response
            );
    }

    showPofile(userId:string):void {
        this._homeService.getUserDetails(userId);
        this._homeService.getFriends(userId);
        localStorage.setItem("actualUser", userId);
    }
}
