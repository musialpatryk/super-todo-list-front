import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { NotesComponent } from './notes/notes.component';
import { GroupsComponent } from './groups/groups.component';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import {AccountModule} from './account/account.module';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import {PipesModule} from '../pipes/pipes.module';


@NgModule({
    declarations: [
        PageNotFoundComponent,
        NotesComponent,
        GroupsComponent,
        LoginComponent,
        BaseLayoutComponent,
    ],
  imports: [
    RouterModule,
    AccountModule,
    PipesModule
  ],
    exports: [
        PageNotFoundComponent,
        NotesComponent
    ]
})
export class ViewsModule {
}
