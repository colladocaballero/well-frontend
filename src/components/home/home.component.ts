import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { User } from '../../models/User';
import { ConfigService } from '../../services/config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessagesService } from '../../services/messages.service';
import { FriendRequestsService } from '../../services/friend-requests.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeProfilePictureComponent } from './change-profile-picture/change-profile-picture.component';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    private _userDetails:User;
    private _imagesUrl:string;
    private _unsub:Subject<void>;
    
    constructor(
        private _homeService:HomeService,
        private _configService:ConfigService,
        private _messagesService:MessagesService,
        private _friendRequestsService:FriendRequestsService,
        private _ngbModal:NgbModal,
        private _titleService:Title
    ) {
        this._imagesUrl = _configService.getImagesUrl();
        this._unsub = new Subject();
        this.getUserDetails();
    }

    ngOnInit() {
        this._homeService.getUserDetails(localStorage.getItem("userId"));
        this._messagesService.getUserMessages();
        this._friendRequestsService.getUserFriendRequests();
        this._titleService.setTitle("Well - Home");
    }

    getUserDetails():void {
        this._homeService.userDetailsSubject
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => this._userDetails = response
            );
    }

    changeProfilePicture():void {
        const modalRef = this._ngbModal.open(ChangeProfilePictureComponent, {size: "lg"})
    }

    ngOnDestroy() {
        this._unsub.next();
        this._unsub.complete();
    }
}
