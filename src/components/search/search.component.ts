import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { User } from '../../models/User';
import { ConfigService } from '../../services/config.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FriendRequestsService } from '../../services/friend-requests.service';
import { Router } from '@angular/router';
import { MessagesService } from '../../services/messages.service';

@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})

export class SearchComponent {
    private _users:User[];
    private _imagesUrl:string;
    private _unsub:Subject<void>;

    constructor(
        private _homeService:HomeService,
        private _configService:ConfigService,
        private _friendRequestsService:FriendRequestsService,
        private _messagesService:MessagesService,
        private _router:Router
    ) {
        this._imagesUrl = _configService.getImagesUrl();
        this._users = [];
        this._unsub = new Subject();
    }

    ngOnInit() {
        this.getUsers();
        this._homeService.searchUsers(localStorage.getItem("searchQuery"));
        this._messagesService.getUserMessages();
        this._friendRequestsService.getUserFriendRequests();
    }

    getUsers():void {
        this._homeService.userResultsSubject
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => {
                    this._users = response;
                }
            );
    }

    sendFriendRequest(user2Id:string) {
        this._friendRequestsService.sendFriendRequest(user2Id)
            .subscribe(
                response => this._homeService.searchUsers(localStorage.getItem("searchQuery"))
            );
    }

    removeFriend(user2Id:string):void {
        this._homeService.removeFriend(user2Id)
            .subscribe(
                response => this._homeService.searchUsers(localStorage.getItem("searchQuery"))
            );
    }

    showPofile(userId:string):void {
        this._homeService.getUserDetails(userId);
        this._homeService.getFriends(userId);
        localStorage.setItem("actualUser", userId);
        this._homeService.isOwnProfile.next(localStorage.getItem('actualUser') == localStorage.getItem('userId'));
        this._router.navigate(['profile']);
    }

    ngOnDestroy() {
        this._unsub.next();
        this._unsub.complete();
    }
}
