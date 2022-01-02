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


@NgModule({
    declarations: [
        PageNotFoundComponent,
        NotesComponent,
        GroupsComponent,
        BaseLayoutComponent,
    ],
    imports: [
        AccountModule,
        LoginModule,
        RouterModule,
        PipesModule,
        CommonModule
    ],
    exports: [
        PageNotFoundComponent,
        NotesComponent
    ]
})
export class ViewsModule {
}
