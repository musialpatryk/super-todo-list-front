import {NgModule} from '@angular/core';
import {LoginWrapperComponent} from './login-wrapper/login-wrapper.component';


@NgModule({
  declarations: [
    LoginWrapperComponent
  ],
  exports: [
    LoginWrapperComponent
  ]
})
export class ComponentsModule {
}
