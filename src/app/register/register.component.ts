import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(
    private _authService: AuthService,
    private _alertify: AlertifyService
  ) {}

  ngOnInit(): void {}

  register() {
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
  }
}
