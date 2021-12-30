import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';
import {NotesComponent} from './views/notes/notes.component';
import {GroupsComponent} from './views/groups/groups.component';
import {AccountComponent} from './views/account/account.component';
import {LoginComponent} from './views/login/login.component';
import {CreateAccountComponent} from './views/login/create-account/create-account.component';
import {BaseLayoutComponent} from './views/base-layout/base-layout.component';

export const routes: Routes = [
  {
    path: 'app',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'notes',
        component: NotesComponent
      },
      { path: 'groups',
        component: GroupsComponent
      },
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: '',
        redirectTo: 'notes',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {
        path: 'create-account',
        component: CreateAccountComponent,
      },
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
