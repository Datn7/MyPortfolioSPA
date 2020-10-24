import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import * as _moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactive-register',
  templateUrl: './reactive-register.component.html',
  styleUrls: ['./reactive-register.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class ReactiveRegisterComponent implements OnInit {
  registerForm: FormGroup;
  date = new FormControl(_moment([2017, 0, 1]));
  user: any;

  constructor(
    private _authService: AuthService,
    private _alertify: AlertifyService,
    private fb: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    /*init form ngOnInit 
       this.registerForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      this.passwordMatchValidator
    );
    */
    this.createRegisterForm();
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ['male'],
        username: ['', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this._authService.register(this.user).subscribe(
        () => {
          this._alertify.success('წარმატებით დარეგისტრირდით');
        },
        (error) => {
          this._alertify.error(error);
        },
        () => {
          this._authService.login(this.user).subscribe(() => {
            this._router.navigate(['/members']);
          });
        }
      );
    }
    /*
    this._authService.register(this.model).subscribe(
      () => {
        this._alertify.success('გაიარეთ რეგისტრაცია');
        console.log('გაიარეთ რეგისტრაცია');
      },
      (error) => {
        this._alertify.error('ვერ დარეგისტრირდი');
        console.log('ვერ დარეგისტრირდი');
      }
    );
    console.log(this.model);
    */
    console.log(this.registerForm.value);
  }
}
