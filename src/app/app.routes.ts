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
import {EditGroupComponent} from './views/groups/edit-group/edit-group.component';
import {RoleGuard} from 'src/app/guards/role.guard';

export const routes: Routes = [
  {
    path: 'app',
    component: BaseLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'notes',
        component: NotesComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'notes/add/:groupId',
        component: AddNoteComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'groups',
        component: GroupsComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'groups/edit/:groupId',
        component: EditGroupComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'account/edit/:accountId',
        component: EditAccountComponent,
        canActivate: [RoleGuard]
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
