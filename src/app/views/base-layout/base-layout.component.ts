import { Component } from '@angular/core';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
})
export class BaseLayoutComponent  {
  constructor(
    public userService: UserService,
  ) {
  }
}
