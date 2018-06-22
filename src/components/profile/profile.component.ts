import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { User } from '../../models/User';
import { ConfigService } from '../../services/config.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';


@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
	private _tabsStyle:string = "justified";
	private _userDetails: User;
	private _imagesUrl: string;
	private _unsub: Subject<void>;

	constructor(
		private _homeService: HomeService,
		private _configService: ConfigService,
		private _titleService:Title
	) {
		this._imagesUrl = _configService.getImagesUrl();
		this._unsub = new Subject();
	}

	ngOnInit() {
		this._homeService.getUserDetails(localStorage.getItem("actualUser"));
		this.getUserDetails();
		this._titleService.setTitle("Well - Perfil");
	}

	getUserDetails(): void {
	this._homeService.userDetailsSubject
		.pipe(takeUntil(this._unsub))
		.subscribe(
			userDetails => {
				this._userDetails = userDetails
			}
		);
	}

	ngOnDestroy() {
		this._unsub.next();
		this._unsub.complete();
	}
}
