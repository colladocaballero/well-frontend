import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	private _loggedIn:boolean;

	constructor(
		private _userService:UserService
	) {
		_userService.authNavStatus.subscribe(value => {
			this._loggedIn = value;
		});
		this._loggedIn = !!localStorage.getItem("auth_token");
	}
}
