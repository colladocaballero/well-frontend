import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserRegistration } from '../../models/UserRegistration';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    private _registerForm:FormGroup;
    private _email:FormControl;
    private _password:FormControl;
    private _name:FormControl;
    private _surname:FormControl;
    private _birthday:FormControl;
    private _gender:FormControl;

    private _unsub:Subject<void>;
    private _isRequestingRegister:boolean;
    private _existingEmail:boolean;

    constructor(
        private _userService:UserService,
        private _router:Router
    ) {
        this._unsub = new Subject();
        this._existingEmail = false;
    }

    ngOnInit() {
        this._userService.isRequestingRegister
            .pipe(takeUntil(this._unsub))
            .subscribe(
                result => this._isRequestingRegister = result
            );

        this.createForm();
    }

    createForm():void {
        this._email = new FormControl("", [Validators.required, Validators.email]);
        this._password = new FormControl("", [Validators.required, Validators.minLength(8)]);
        this._name = new FormControl("", Validators.required);
        this._surname = new FormControl("", Validators.required);
        this._birthday = new FormControl("", Validators.required);
        this._gender = new FormControl("", Validators.required);

        this._registerForm = new FormGroup({
            email: this._email,
            password: this._password,
            name: this._name,
            surname: this._surname,
            birthday: this._birthday,
            gender: this._gender
        });
    }
    
    registerUser({value, valid}:{value:UserRegistration, valid:boolean}) {
        this._userService.isRequestingRegister.next(true);

        if (valid) {
            this._userService.register(value.email, value.password, value.name, value.surname, value.birthday, value.gender)
                .pipe(takeUntil(this._unsub))
                .subscribe(
                    result => {
                        this._userService.isRequestingRegister.next(false);
                        this._router.navigate(["/home"]);
                    },
                    error => {
                        this._userService.isRequestingRegister.next(false);
                        this._existingEmail = true;
                    }
                );
        }
    }

    ngOnDestroy() {
        this._unsub.next();
        this._unsub.complete();
    }
}
