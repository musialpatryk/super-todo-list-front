import {NgModule} from '@angular/core';
import {LoginWrapperComponent} from './login-wrapper/login-wrapper.component';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';
import {CommonModule} from '@angular/common';
import {PipesModule} from '../pipes/pipes.module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NoteComponent } from './note/note.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule
  ],
    declarations: [
      LoginWrapperComponent,
      ValidationErrorsComponent,
      BreadcrumbsComponent,
      NoteComponent
    ],
    exports: [
        LoginWrapperComponent,
        ValidationErrorsComponent,
        BreadcrumbsComponent,
        NoteComponent
    ]
})
export class ComponentsModule {
}
