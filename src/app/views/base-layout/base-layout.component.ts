import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {IRestUser} from 'src/app/services/rest/rest.interfaces';

interface ILink {
  link: string;
  lang: string;
  roles: IRestUser['roles'];
}

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
})
export class BaseLayoutComponent implements OnInit {
  links: ILink[] = [
    {
      link: 'notes',
      lang: 'NOTES',
      roles: ['user']
    },
    {
      link: 'groups',
      lang: 'GROUP_MANAGEMENT',
      roles: ['user']
    },
    {
      link: 'account',
      lang: 'ACCOUNT',
      roles: ['user']
    },
    {
      link: 'admin',
      lang: 'ADMIN',
      roles: ['admin']
    },
  ];
  availableLinks: ILink[] = [];

  constructor(
    public userService: UserService,
  ) {
  }

  ngOnInit(): void {
    const user = this.userService.getUser();
    this.availableLinks = this.links.filter((link) => {
      return user.roles.find((role) => {
        return link.roles.includes(role);
      })
    });
  }
}
