import { Component } from '@angular/core';
import { CommentsService } from '../../../services/comments.service';
import { Subject } from 'rxjs';
import { takeUntil, subscribeOn } from 'rxjs/operators';
import { HomeService } from '../../../services/home.service';
import { User } from '../../../models/User';
import { ConfigService } from '../../../services/config.service';

@Component({
    selector: 'comments',
    templateUrl: 'comments.component.html'
})

export class CommentsComponent {
    private _comments:Comment[];
    private _userDetails:User;
    private _unsub:Subject<void>;
    private _imagesUrl:string;

    constructor(
        private _commentsService:CommentsService,
        private _homeService:HomeService,
        private _configService:ConfigService
    ) {
        this._comments = [];
        this._unsub = new Subject();
        this._imagesUrl = _configService.getImagesUrl();
    }

    ngOnInit() {
        this.getUserComments();
    }

    getUserComments():void {
        this._commentsService.getUserComments(localStorage.getItem("actualUser"));
        this._commentsService.userComments
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._comments = response
            );
    }
}
