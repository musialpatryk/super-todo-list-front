import { Component } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {IRestUser} from '../../services/rest/rest.interfaces';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent  {
  user: IRestUser;

  constructor(
    private userService: UserService
  ) {
    this.user = userService.getUser();
  }
}
