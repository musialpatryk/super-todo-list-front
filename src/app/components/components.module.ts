import {NgModule} from '@angular/core';
import {LoginWrapperComponent} from './login-wrapper/login-wrapper.component';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';
import {CommonModule} from '@angular/common';
import {PipesModule} from '../pipes/pipes.module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NoteComponent } from './note/note.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LangSelectComponent } from './lang-select/lang-select.component';


@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule
  ],
    declarations: [
      LoginWrapperComponent,
      ValidationErrorsComponent,
      BreadcrumbsComponent,
      NoteComponent,
      LangSelectComponent
    ],
  exports: [
    LoginWrapperComponent,
    ValidationErrorsComponent,
    BreadcrumbsComponent,
    NoteComponent,
    LangSelectComponent
  ]
})
export class ComponentsModule {
}
