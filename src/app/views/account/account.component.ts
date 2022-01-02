import { Component } from '@angular/core';
import {IUser, UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent  {
  user: IUser;

  constructor(
    private userService: UserService
  ) {
    this.user = userService.getUser();
  }
}
