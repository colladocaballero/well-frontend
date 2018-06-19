import { Component } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { User } from '../../../models/User';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigService } from '../../../services/config.service';
import { Router } from '@angular/router';
import { FriendRequestsService } from '../../../services/friend-requests.service';

@Component({
    selector: 'friends',
    templateUrl: 'friends.component.html',
    styleUrls: ['friends.component.css']
})

export class FriendsComponent {
    private _friends:User[];
    private _unsub:Subject<void>;
    private _imagesUrl:string;
    private _ownProfile:boolean;

    constructor(
        private _homeService:HomeService,
        private _configService:ConfigService,
        private _friendRequestsService:FriendRequestsService,
        private _router:Router
    ) {
        this._friends = [];
        this._unsub = new Subject();
        this._imagesUrl = _configService.getImagesUrl();
    }

    ngOnInit() {
        this.getFriends();
        this._homeService.isOwnProfile.next(localStorage.getItem('actualUser') == localStorage.getItem('userId'));
        this.isOwnProfile();
    }

    isOwnProfile():void {
        this._homeService.isOwnProfile
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => {
                    this._ownProfile = response;
                }
            );
    }

    getFriends():void {
        this._homeService.getFriends(localStorage.getItem("actualUser"));
        this._homeService.userFriendsSubject
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._friends = response
            );
    }

    sendFriendRequest(user2Id:string) {
        this._friendRequestsService.sendFriendRequest(user2Id)
            .subscribe(
                response => this.getFriends()
            );
    }

    removeFriend(user2Id:string):void {
        this._homeService.removeFriend(user2Id)
            .subscribe(
                response => this._homeService.getFriends(localStorage.getItem("actualUser"))
            );
    }

    showPofile(userId:string):void {
        this._homeService.getUserDetails(userId);
        this._homeService.getFriends(userId);
        localStorage.setItem("actualUser", userId);
        this._homeService.isOwnProfile.next(localStorage.getItem('actualUser') == localStorage.getItem('userId'));
    }

    ngOnDestroy() {
        this._unsub.next();
        this._unsub.complete();
    }
}
