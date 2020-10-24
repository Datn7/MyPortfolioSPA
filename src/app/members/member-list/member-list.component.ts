import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(
    private _userService: UserService,
    private _alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this._userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        this._alertify.error(error);
      }
    );
  }
}
