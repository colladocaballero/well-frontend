import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserRegistration } from '../../models/UserRegistration';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    registerForm:FormGroup;
    email:FormControl;
    password:FormControl;
    name:FormControl;
    surname:FormControl;
    birthday:FormControl;
    gender:FormControl;

    submitted:boolean;
    private _isRequestingSub:Subscription;
    private _isRequesting:boolean;
    errors:string;
    existingEmail:boolean;

    constructor(
        private _userService:UserService,
        private _router:Router
    ) {
        this.email = new FormControl("", [Validators.required, Validators.email]);
        this.password = new FormControl("", [Validators.required, Validators.minLength(8)]);
        this.name = new FormControl("", Validators.required);
        this.surname = new FormControl("", Validators.required);
        this.birthday = new FormControl("", Validators.required);
        this.gender = new FormControl("", Validators.required);

        this.registerForm = new FormGroup({
            email: this.email,
            password: this.password,
            name: this.name,
            surname: this.surname,
            birthday: this.birthday,
            gender: this.gender
        });

        this._isRequestingSub = _userService.isRequesting.subscribe(
            result => this._isRequesting = result
        );
        this.existingEmail = false;
    }
    
    registerUser({value, valid}:{value:UserRegistration, valid:boolean}) {
        this.submitted = true;
        this._userService.isRequesting.next(true);
        this.errors = "";

        if (valid) {
            this._userService.register(value.email, value.password, value.name, value.surname, value.birthday, value.gender).subscribe(
                result => {
                    this._userService.isRequesting.next(false);
                    this._router.navigate(["/home"]);
                },
                error => {
                    this.existingEmail = true;
                }
            );
        }
    }

    ngOnDestroy() {
        this._isRequestingSub.unsubscribe();
    }
}
