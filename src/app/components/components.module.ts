import {NgModule} from '@angular/core';
import {LoginWrapperComponent} from './login-wrapper/login-wrapper.component';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';
import {CommonModule} from '@angular/common';
import {PipesModule} from '../pipes/pipes.module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';


@NgModule({
  imports: [
    CommonModule,
    PipesModule
  ],
    declarations: [
      LoginWrapperComponent,
      ValidationErrorsComponent,
      BreadcrumbsComponent
    ],
    exports: [
        LoginWrapperComponent,
        ValidationErrorsComponent,
        BreadcrumbsComponent
    ]
})
export class ComponentsModule {
}
