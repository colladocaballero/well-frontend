import { Component, Input } from '@angular/core';
import { Message } from '../../../models/Message';
import { MessagesService } from '../../../services/messages.service';
import { ConfigService } from '../../../services/config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewMessageComponent } from '../new-message/new-message.component';

@Component({
    selector: 'message',
    templateUrl: 'message.component.html',
    styleUrls: ['message.component.css']
})

export class MessageComponent {
    @Input() _message:Message;
    private _imagesUrl:string;
    private _unsub:Subject<void>;

    constructor(
        private _messagesService:MessagesService,
        private _configService:ConfigService,
        private _modalService:NgbModal
    ) {
        this._imagesUrl = _configService.getImagesUrl();
        this._unsub = new Subject();
    }

    goBack():void {
        this._messagesService.showMessage.next(false);
    }

    markAsUnread():void {
        this._messagesService.markAsUnread(this._message.id)
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._messagesService.getUserMessages()
            );
    }

    deleteMessage():void {
        this._messagesService.isDeleting.next(true);
    }

    cancelDeleteMessage():void {
        this._messagesService.isDeleting.next(false);
    }

    confirmDeleteMessage():void {
        this._messagesService.deleteMessage(this._message.id)
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => {
                    this._messagesService.getUserMessages();
                    this._messagesService.showMessage.next(false);
                    this._messagesService.isDeleting.next(false);
                }
            );
    }

    replyMessage(message:Message):void {
        const modalRef = this._modalService.open(NewMessageComponent);
        modalRef.componentInstance._replyTo = message.userTransmitterId;
        modalRef.componentInstance._replyTitle = `RE: ${message.title}`;
        modalRef.componentInstance._replyName = message.userTransmitter.name;
    }

    ngOnDestroy() {
        this._messagesService.showMessage.next(false);
        this._unsub.next();
        this._unsub.complete();
    }
}
