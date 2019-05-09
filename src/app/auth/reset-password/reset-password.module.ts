import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// app
import { ResetPasswordComponent } from './containers/reset-password/reset-password.component';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ResetPasswordRoutingModule,
    SharedModule
  ]
})
export class ResetPasswordModule {
}
