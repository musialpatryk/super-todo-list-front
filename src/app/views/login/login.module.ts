import {NgModule} from '@angular/core';
import {CreateAccountComponent} from './create-account/create-account.component';
import {LoginComponent} from './login.component';
import {PipesModule} from '../../pipes/pipes.module';
import {RouterModule} from '@angular/router';
import {ComponentsModule} from '../../components/components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
    imports: [
        ComponentsModule,
        PipesModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
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
