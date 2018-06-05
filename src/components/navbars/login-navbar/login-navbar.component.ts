import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Credentials } from '../../../models/Credentials';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'login-navbar',
    templateUrl: 'login-navbar.component.html'
})

export class LoginNavbarComponent {
    loginForm:FormGroup;
    email:FormControl;
    password:FormControl;
    
    private _subscription:Subscription;
    private _isRequesingSub:Subscription;
    private _isRequesting:boolean;
	brandNew:boolean;
	errors:string;
	submitted:boolean;
    credentials:Credentials;
    loginFailed:boolean;

	constructor(
		private _userService:UserService,
		private _router:Router,
		private _activatedRoute:ActivatedRoute
	) {
		this.submitted = false;
        this.credentials = {email: "", password: ""};
        this.loginFailed = false;

        this.email = new FormControl();
        this.password = new FormControl();
        this.loginForm = new FormGroup({
            email: this.email,
            password: this.password
        });
	}
    ngOnInit() {
        this._subscription = this._activatedRoute.queryParams.subscribe((param:any) => {
            this.brandNew = param["brandNew"];
            this.credentials.email = param["email"];
        });

        this._isRequesingSub = this._userService.isRequesting.subscribe(
            result => this._isRequesting = result
        );
    }

    login({value, valid}:{value:Credentials, valid:boolean}) {
        if (this.email.dirty && this.password.dirty) {
            this.submitted = true;
            this._userService.isRequesting.next(true);
            this.errors = "";

            if (valid) {
                this._userService.login(value.email, value.password).subscribe(
                    result => {
                        this._userService.isRequesting.next(false);
                        this._router.navigate(["/home"]);
                    },
                    error => {
                        this.loginFailed = true;
                    }
                )
            }

            this.loginForm.reset();
        }
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
        this._isRequesingSub.unsubscribe();
    }
}
