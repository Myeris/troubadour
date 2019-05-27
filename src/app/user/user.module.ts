import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// app
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../auth/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    UserRoutingModule,
    SharedModule.forRoot()

  ]
})
export class UserModule { }
