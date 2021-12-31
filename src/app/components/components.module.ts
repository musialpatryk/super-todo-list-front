import {NgModule} from '@angular/core';
import {LoginWrapperComponent} from './login-wrapper/login-wrapper.component';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';
import {CommonModule} from '@angular/common';
import {PipesModule} from '../pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    PipesModule
  ],
    declarations: [
      LoginWrapperComponent,
      ValidationErrorsComponent
    ],
    exports: [
      LoginWrapperComponent,
      ValidationErrorsComponent
    ]
})
export class ComponentsModule {
}
