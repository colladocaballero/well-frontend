import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PhotosService } from '../../../services/photo.service';
import { Router } from '@angular/router';
import { HomeService } from '../../../services/home.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentsService } from '../../../services/comments.service';
import { FriendRequestsService } from '../../../services/friend-requests.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MessagesService } from '../../../services/messages.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';

@Component({
    selector: 'home-navbar',
    templateUrl: 'home-navbar.component.html'
})

export class HomeNavbarComponent {
    private _unreadMessagesCount:number;
    private _friendRequestsCount:number;
    private _unsub:Subject<void>;
    private _formSearch:FormGroup;

    constructor(
        private _userService:UserService,
        private _photosService:PhotosService,
        private _homeService:HomeService,
        private _router:Router,
        private _commentsService:CommentsService,
        private _messagesService:MessagesService,
        private _friendRequestsService:FriendRequestsService,
        private _ngbModal:NgbModal
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

    uploadPhoto():void {
        const modalRef = this._ngbModal.open(UploadPhotoComponent);
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
        localStorage.setItem("searchQuery", this._formSearch.controls["query"].value);
        this._homeService.searchUsers(localStorage.getItem("searchQuery"));
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
