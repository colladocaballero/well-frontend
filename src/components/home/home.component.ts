import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { User } from '../../models/User';

@Component({
    selector: "home",
    templateUrl: "home.component.html"
})

export class HomeComponent {
    private _userDetails:{message:string};
    
    constructor(
        private _homeService:HomeService
    ) {}

    ngOnInit() {
        this._homeService.getUserDetails()
        .subscribe(userDetails => {
            this._userDetails = userDetails;
        },
        error => {
            console.log(error);
            
        });
    }
}
