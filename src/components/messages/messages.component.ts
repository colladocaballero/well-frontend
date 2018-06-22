import { Component } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { Message } from '../../models/Message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigService } from '../../services/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewMessageComponent } from './new-message/new-message.component';
import { FriendRequest } from '../../models/FriendRequest';
import { FriendRequestsService } from '../../services/friend-requests.service';
import { HomeService } from '../../services/home.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'messages',
    templateUrl: 'messages.component.html',
    styleUrls: ['messages.component.css']
})

export class MessagesComponent {
    private _imagesUrl:string;
    private _messages:Message[];
    private _unreadMessagesCount:number;
    private _friendRequests:FriendRequest[];
    private _requestsCount:number;
    private _unsub:Subject<void>;
    private _messageToShow:Message;

    constructor(
        private _messagesService:MessagesService,
        private _configService:ConfigService,
        private _modalService:NgbModal,
        private _friendRequestsService:FriendRequestsService,
        private _homeService:HomeService,
        private _router:Router,
        private _titleService:Title
    ) {
        this._messages = [];
        this._friendRequests = [];
        this._unsub = new Subject();
        this._imagesUrl = _configService.getImagesUrl();
    }

    ngOnInit() {
        this.getUserMessages();
        this.getUnreadMessagesCount();
        this.getUserFriendRequests();
        this.getRequestsCount();
        this._messagesService.getUserMessages();
        this._friendRequestsService.getUserFriendRequests();
        this._titleService.setTitle("Well - Mensajes");
    }

    getUserMessages():void {
        this._messagesService.messagesSub
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._messages = response
            );
    }

    getUnreadMessagesCount():void {
        this._messagesService.unreadMessagesCount
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._unreadMessagesCount = response
            );
    }

    getUserFriendRequests():void {
        this._friendRequestsService.friendRequestsSubject
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._friendRequests = response
            );
    }

    getRequestsCount():void {
        this._friendRequestsService.requestsCountSubject
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._requestsCount = response
            );
    }

    showMessage(message:Message):void {
        if (message.status == "Unread") this.markAsRead(message);

        this._messageToShow = message;
        this._messagesService.showMessage.next(true);
    }

    markAsRead(message:Message):void {
        this._messagesService.markAsRead(message.id)
            .subscribe(
                response => this._messagesService.getUserMessages()
            );
    }

    newMessage():void {
        const modalRef = this._modalService.open(NewMessageComponent);
    }

    acceptFriendRequest(friendRequest:FriendRequest):void {
        this._friendRequestsService.acceptFriendRequest(friendRequest)
            .subscribe(
                response => this._friendRequestsService.getUserFriendRequests()
            );
    }

    rejectFriendRequest(id:number):void {
        this._friendRequestsService.rejectFriendRequest(id)
            .subscribe(
                response => this._friendRequestsService.getUserFriendRequests()
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
