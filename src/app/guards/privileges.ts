import {IRestUser} from 'src/app/services/rest/rest.interfaces';


export interface IPrivilege {
  url: string;
  roles: IRestUser['roles'];
  redirectTo: string;
}

export const privileges: IPrivilege[] = [
  {
    url: '/app/notes',
    roles: ['user'],
    redirectTo: '/app/account'
  },
  {
    url: '/app/groups',
    roles: ['user'],
    redirectTo: '/app/account'
  },
  {
    url: '/app/account',
    roles: ['user', 'admin'],
    redirectTo: ''
  },
  {
    url: '/app/admin',
    roles: ['admin'],
    redirectTo: '/app/account'
  }
];
