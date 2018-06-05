import { Component } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { CommentsService } from '../../services/comments.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/User';
import { HomeService } from '../../services/home.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'comments',
    templateUrl: 'comments.component.html'
})

export class CommentsComponent {
    private _imagesUrl:string;
    private _comments:Comment[];
    private _commentsSub:Subscription;
    private _userDetails:User;
    private _userDetailsSub:Subscription;
    private _commentForm:FormGroup;
    private _commentText:FormControl;

    constructor(
        private _commentsService:CommentsService,
        private _configService:ConfigService,
        private _homeService:HomeService
    ) {}
    
    ngOnInit() {
        this._imagesUrl = this._configService.getImagesUrl();
        this._commentsSub = this.getWallComments();
        this._userDetailsSub = this.getUserDetails();
        this.createForm();
    }

    createForm():void {
        this._commentText = new FormControl();
        this._commentForm = new FormGroup({
            commentText: this._commentText
        })
    }

    getWallComments():Subscription {
        this._commentsService.getWallComments(localStorage.getItem("userId"));
        return this._commentsService.comments.subscribe(
            result => {
                this._comments = result;
            }
        );
    }

    getUserDetails():Subscription {
        return this._homeService.userDetails.subscribe(
            response => this._userDetails = response
        );
    }

    addNewComment() {
        if (this._commentText.value.length > 0) {
            this._commentsService.addNewComment(this._userDetails.id, this._commentText.value, this.getDate()).subscribe(
                response => {
                    this._commentsService.isSending.next(false);
                    this._commentsService.getWallComments(this._userDetails.id);
                    this._commentText.reset();
                }
            );
        }
    }

    getDate():string {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        return `${month}/${day}/${year} ${hour}:${minute}:${second}`;
    }

    ngOnDestroy() {
        this._commentsSub.unsubscribe();
        this._userDetailsSub.unsubscribe();
    }
}
