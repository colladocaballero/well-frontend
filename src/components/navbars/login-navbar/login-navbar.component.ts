import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Credentials } from '../../../models/Credentials';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: "login-navbar",
    templateUrl: "login-navbar.component.html"
})

export class LoginNavbarComponent {
    loginForm:FormGroup;
    email:FormControl;
    password:FormControl;
    
    private _subscription:Subscription;
	brandNew:boolean;
	errors:string;
	isRequesing:boolean;
	submitted:boolean;
	credentials:Credentials;

	constructor(
		private _userService:UserService,
		private _router:Router,
		private _activatedRoute:ActivatedRoute
	) {
		this.submitted = false;
        this.credentials = {email:"", password:""};
        this.isRequesing = false;

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
    }

    login({value, valid}:{value:Credentials, valid:boolean}) {
        this.submitted = true;
        this.isRequesing = true;
        this.errors = "";

        if (valid) {
            this._userService.login(value.email, value.password).subscribe(
                result => {
                    this._router.navigate(["/home"]);
                    this.isRequesing = false;
                },
                error => {
                    this.errors = error;
                }
            )
        }

        this.loginForm.reset();
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
