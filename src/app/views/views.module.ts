import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { NotesComponent } from './notes/notes.component';
import { GroupsComponent } from './groups/groups.component';
import {RouterModule} from '@angular/router';
import {AccountModule} from './account/account.module';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import {PipesModule} from '../pipes/pipes.module';
import {LoginModule} from './login/login.module';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from '../components/components.module';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditGroupComponent } from './groups/edit-group/edit-group.component';


@NgModule({
    declarations: [
        PageNotFoundComponent,
        NotesComponent,
        GroupsComponent,
        BaseLayoutComponent,
        AddNoteComponent,
        EditGroupComponent,
    ],
  imports: [
    AccountModule,
    LoginModule,
    RouterModule,
    PipesModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
    exports: [
        PageNotFoundComponent,
        NotesComponent
    ]
})
export class ViewsModule {
}
