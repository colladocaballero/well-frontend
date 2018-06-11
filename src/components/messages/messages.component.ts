import { Component } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { Message } from '../../models/Message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigService } from '../../services/config.service';

@Component({
    selector: 'messages',
    templateUrl: 'messages.component.html',
    styleUrls: ['messages.component.css']
})

export class MessagesComponent {
    private _imagesUrl:string;
    private _messages:Message[];
    private _unreadCount:number;
    private _unsub:Subject<void>;
    private _messageToShow:Message;

    constructor(
        private _messagesService:MessagesService,
        private _configService:ConfigService
    ) {
        this._messages = [];
        this._unsub = new Subject();
        this._imagesUrl = _configService.getImagesUrl();
    }

    ngOnInit() {
        this.getUserMessages();
        this.getUnreadCount();
    }

    getUserMessages():void {
        this._messagesService.getUserMessages(localStorage.getItem("userId"));
        this._messagesService.messagesSub
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._messages = response
            );
    }

    getUnreadCount():void {
        this._messagesService.unreadMessagesCount
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._unreadCount = response
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
                response => this._messagesService.getUserMessages(localStorage.getItem("userId"))
            );
    }

    ngOnDestroy() {
        this._unsub.next();
        this._unsub.complete();
    }
}
