import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Post } from './models/post.model';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MyPortfolioSPA';
  jwtHelper = new JwtHelperService();

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this._authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
