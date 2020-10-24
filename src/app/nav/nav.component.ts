import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public _authService: AuthService,
    private _alertify: AlertifyService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this._authService.login(this.model).subscribe(
      (next) => {
        this._alertify.success('სერვერთან დაკავშირდი და შეხვედი');
        console.log('სერვერთან დაკავშირდი და შეხვედი');
      },
      (error) => {
        console.log('FAIL, ვერ დაკავშირდი სევერთან');
      },
      () => {
        this._router.navigate(['/table']);
      }
    );
  }

  loggedIn() {
    return this._authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this._alertify.message('გახვედით');
    console.log('გახვედით');
    this._router.navigate(['/home']);
  }
}
