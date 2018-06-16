import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../../../models/User';
import { HomeService } from '../../../services/home.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessagesService } from '../../../services/messages.service';

@Component({
    selector: 'new-message',
    templateUrl: 'new-message.component.html'
})

export class NewMessageComponent {
    private _formMessage:FormGroup;
    private _friends:User[];
    private _unsub:Subject<void>;
    private _replyTitle:string;
    private _replyTo:string;
    private _replyName:string;

    constructor(
        public activeModal:NgbActiveModal,
        private _homeService:HomeService,
        private _messagesService:MessagesService
    ) {
        this._unsub = new Subject();
        this._friends = [];
    }

    ngOnInit() {
        this._homeService.getFriends(localStorage.getItem("userId"));
        if (this._replyTo) {
            this.createForm();
        } else {
            this.getFriends();
        }
    }

    getFriends():void {
        this._homeService.userFriendsSubject
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => {
                    this._friends = response;
                    if(response != null) this.createForm();
                }
            );
    }

    createForm():void {
        this._formMessage = new FormGroup({
            title: new FormControl(this._replyTitle ? this._replyTitle : ""),
            message: new FormControl("")
        });

        if (!this._replyTo) {
            this._friends.forEach(f => {
                this._formMessage.addControl(`check${f.id}`, new FormControl());
            });
        }
    }

    sendMessage():void {
        if (!this._replyTo) {
            let receiversIds:string[] = [];

            for (let i = 2; i < Object.keys(this._formMessage.controls).length; i++) {
                if (this._formMessage.controls[Object.keys(this._formMessage.controls)[i]].value) receiversIds.push(this._friends[i - 2].id);
            }

            if (receiversIds.length > 0) {
                this._messagesService.sendMessage(this._formMessage.controls["title"].value, this._formMessage.controls["message"].value, localStorage.getItem("userId"), receiversIds)
                    .subscribe(
                        response => this.activeModal.close()
                    );
            }
        } else {
            if (this._formMessage.controls["message"].value.length > 0) {
                this._messagesService.sendMessage(this._formMessage.controls["title"].value, this._formMessage.controls["message"].value, localStorage.getItem("userId"), [this._replyTo])
                    .subscribe(
                        response => this.activeModal.close()
                    );
            }
        }
    }

    ngOnDestroy() {
        this._unsub.next();
        this._unsub.complete();
    }
}
