import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Credentials } from '../../../models/Credentials';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'login-navbar',
    templateUrl: 'login-navbar.component.html'
})

export class LoginNavbarComponent {
    private _loginForm:FormGroup;
    private _email:FormControl;
    private _password:FormControl;
    
    private _unsub:Subject<void>;
    private _isRequestingLogin:boolean;
    private _credentials:Credentials;
    private _loginFailed:boolean;

	constructor(
		private _userService:UserService,
		private _router:Router,
		private _activatedRoute:ActivatedRoute
	) {
        this._credentials = {email: "", password: ""};
        this._loginFailed = false;
        this._unsub = new Subject();

        this._email = new FormControl();
        this._password = new FormControl();
        this._loginForm = new FormGroup({
            email: this._email,
            password: this._password
        });
    }
    
    ngOnInit() {
        this._userService.isRequestingLogin.subscribe(
            result => this._isRequestingLogin = result
        );
    }

    login({value, valid}:{value:Credentials, valid:boolean}) {
        if (this._email.dirty && this._password.dirty) {
            this._userService.isRequestingLogin.next(true);

            if (valid) {
                this._userService.login(value.email, value.password)
                .pipe(takeUntil(this._unsub))
                    .subscribe(
                        result => {
                            this._userService.isRequestingLogin.next(false);
                            this._router.navigate(["/home"]);
                        },
                        error => {
                            this._userService.isRequestingLogin.next(false);
                            this._loginFailed = true;
                        }
                    );
            }

            this._loginForm.reset();
        }
    }

    ngOnDestroy() {
        this._unsub.next();
        this._unsub.complete();
    }
}
