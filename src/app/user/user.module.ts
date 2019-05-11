import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// app
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../auth/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule.forRoot()

  ]
})
export class UserModule { }
