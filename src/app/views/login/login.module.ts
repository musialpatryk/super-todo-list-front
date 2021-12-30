import {NgModule} from '@angular/core';
import {CreateAccountComponent} from './create-account/create-account.component';
import {LoginComponent} from './login.component';
import {PipesModule} from '../../pipes/pipes.module';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    PipesModule,
    RouterModule
  ],
  declarations: [
    LoginComponent,
    CreateAccountComponent
  ],
  exports: [
    LoginComponent,
    CreateAccountComponent
  ]
})
export class LoginModule {
}
