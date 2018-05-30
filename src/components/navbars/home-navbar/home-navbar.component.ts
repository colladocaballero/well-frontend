import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'home-navbar',
    templateUrl: 'home-navbar.component.html'
})

export class HomeNavbarComponent {
    constructor(
        private _userService:UserService
    ) {}

    logOut():void {
        this._userService.logOut();
    }
}
