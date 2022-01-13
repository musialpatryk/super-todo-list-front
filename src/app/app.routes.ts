import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';
import {NotesComponent} from './views/notes/notes.component';
import {GroupsComponent} from './views/groups/groups.component';
import {AccountComponent} from './views/account/account.component';
import {LoginComponent} from './views/login/login.component';
import {CreateAccountComponent} from './views/login/create-account/create-account.component';
import {BaseLayoutComponent} from './views/base-layout/base-layout.component';
import {AuthGuard} from './guards/auth.guard';
import {AddNoteComponent} from './views/notes/add-note/add-note.component';
import {EditAccountComponent} from './views/account/edit-account/edit-account.component';

export const routes: Routes = [
  {
    path: 'app',
    component: BaseLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'notes',
        component: NotesComponent
      },
      {
        path: 'notes/add/:groupId',
        component: AddNoteComponent,
      },
      {
        path: 'groups',
        component: GroupsComponent
      },
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: 'account/edit/:accountId',
        component: EditAccountComponent
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
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: LoginComponent,
      },
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
