import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PhotosService } from '../../../services/photo.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { HomeService } from '../../../services/home.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentsService } from '../../../services/comments.service';
import { FriendRequestsService } from '../../../services/friend-requests.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MessagesService } from '../../../services/messages.service';

@Component({
    selector: 'home-navbar',
    templateUrl: 'home-navbar.component.html'
})

export class HomeNavbarComponent {
    public filesToUpload;
    private _unreadMessagesCount:number;
    private _friendRequestsCount:number;
    private _unsub:Subject<void>;
    private _formSearch:FormGroup;

    constructor(
        private _userService:UserService,
        private _photosService:PhotosService,
        private _configService:ConfigService,
        private _homeService:HomeService,
        private _router:Router,
        private _commentsService:CommentsService,
        private _messagesService:MessagesService,
        private _friendRequestsService:FriendRequestsService
    ) {
        this._unsub = new Subject();
    }

    ngOnInit() {
        this.createForm();
        this.getUnreadMessagesCount();
        this.getFriendRequestsCount();
    }

    createForm():void {
        this._formSearch = new FormGroup({
            query: new FormControl("")
        });
    }

    getUnreadMessagesCount():void {
        this._messagesService.unreadMessagesCount
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._unreadMessagesCount = response
            );
    }

    getFriendRequestsCount():void {
        this._friendRequestsService.requestsCountSubject
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._friendRequestsCount = response
            );
    }

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
        localStorage.setItem("actualUser", localStorage.getItem("userId"));
        
        if (this._router.url == "/profile") {
            this._homeService.getUserDetails(localStorage.getItem("userId"));
            this._homeService.getFriends(localStorage.getItem("userId"));
            this._commentsService.getUserComments(localStorage.getItem("userId"));
            this._photosService.getPhotos(localStorage.getItem("userId"));
            this._homeService.isOwnProfile.next(localStorage.getItem("userId") == localStorage.getItem("actualUser"));
        } else {
            this._router.navigate(['profile']);
        }
    }

    search():void {
        this._homeService.searchUsers(this._formSearch.controls["query"].value);
        this._router.navigate(['search']);
    }

    logOut():void {
        this._userService.logOut();
    }

    ngOnDestroy() {
        this._unsub.next();
        this._unsub.complete();
    }
}
