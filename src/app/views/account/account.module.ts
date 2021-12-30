import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountComponent} from './account.component';
import {CreateAccountComponent} from './create-account/create-account.component';



@NgModule({
  declarations: [
    AccountComponent,
    CreateAccountComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CreateAccountComponent,
    AccountComponent
  ]
})
export class AccountModule { }
