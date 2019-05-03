import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// app
import {RegisterComponent} from './containers/register/register.component';
import {SharedModule} from '../shared/shared.module';
import {RegisterRoutingModule} from './register-routing.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule
  ]
})
export class RegisterModule {
}
