import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountComponent} from './account.component';
import {PipesModule} from '../../pipes/pipes.module';
import { EditAccountComponent } from './edit-account/edit-account.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';



@NgModule({
  declarations: [
    AccountComponent,
    EditAccountComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports: [
    AccountComponent
  ]
})
export class AccountModule { }
