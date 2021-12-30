import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { NotesComponent } from './notes/notes.component';
import { GroupsComponent } from './groups/groups.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    NotesComponent,
    GroupsComponent,
    AccountComponent,
    LoginComponent
  ],
  exports: [
    PageNotFoundComponent,
    NotesComponent
  ]
})
export class ViewsModule {
}
