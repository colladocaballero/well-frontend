import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { User } from '../../models/User';
import { ConfigService } from '../../services/config.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})

export class SearchComponent {
    private _users:User[];
    private _imagesUrl:string;
    private _unsub:Subject<void>;

    constructor(
        private _homeService:HomeService,
        private _configService:ConfigService
    ) {
        this._imagesUrl = _configService.getImagesUrl();
        this._users = [];
        this._unsub = new Subject();
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers():void {
        this._homeService.userResultsSubject
            .pipe(takeUntil(this._unsub))
            .subscribe(
                response => {
                    this._users = response;
                }
            );
    }

    ngOnDestroy() {
        this._unsub.next();
        this._unsub.complete();
    }
}
