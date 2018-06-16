import { Component } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { CommentsService } from '../../../services/comments.service';
import { User } from '../../../models/User';
import { HomeService } from '../../../services/home.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'comments',
    templateUrl: 'comments.component.html'
})

export class CommentsComponent {
    private _imagesUrl:string;
    private _comments:Comment[];
    private _userDetails:User;
    private _unsub:Subject<void>;
    private _isSending:boolean;
    private _commentForm:FormGroup;
    private _commentText:FormControl;

    constructor(
        private _commentsService:CommentsService,
        private _configService:ConfigService,
        private _homeService:HomeService,
        private _router:Router
    ) {
        this._unsub = new Subject();
    }
    
    ngOnInit() {
        this._imagesUrl = this._configService.getImagesUrl();
        this.getWallComments();
        this.getUserDetails();
        this.createForm();
        this.getSendingStatus();
    }

    createForm():void {
        this._commentText = new FormControl("");
        this._commentForm = new FormGroup({
            commentText: this._commentText
        })
    }

    getWallComments():void {
        this._commentsService.getWallComments(localStorage.getItem("userId"));
        this._commentsService.comments
            .pipe(takeUntil(this._unsub))
            .subscribe(
                result => {
                    this._comments = result;
                }
            );
    }

    getUserDetails():void {
        this._homeService.userDetailsSubject
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._userDetails = response
            );
    }

    getSendingStatus():void {
        this._commentsService.isSending
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._isSending = response
            );
    }

    addNewComment() {
        if (this._commentText.value.length > 0) {
        
        this._commentsService.addNewComment(this._userDetails.id, this._commentText.value)
                .subscribe(
                    response => {
                        this._commentsService.isSending.next(false);
                        this._commentsService.getWallComments(this._userDetails.id);
                        this._commentText.reset();
                    }
                );
        }
    }

    showProfile(userId:string):void {
        localStorage.setItem("actualUser", userId);
        this._router.navigate(['profile']);
    }

    ngOnDestroy() {
        this._unsub.next();
        this._unsub.complete();
    }
}
