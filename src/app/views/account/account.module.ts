import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountComponent} from './account.component';
import {PipesModule} from '../../pipes/pipes.module';



@NgModule({
  declarations: [
    AccountComponent,
  ],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    AccountComponent
  ]
})
export class AccountModule { }
