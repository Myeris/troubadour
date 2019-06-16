import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
// app
import { UserProfileComponent } from './containers/user-profile/user-profile.component';
import { AppSharedModule } from '../../shared/shared.module';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { RemoveFormComponent } from './components/remove-form/remove-form.component';

export const routes: Routes = [{ path: '', component: UserProfileComponent }];

@NgModule({
  declarations: [UserProfileComponent, PasswordFormComponent, RemoveFormComponent],
  exports: [UserProfileComponent, PasswordFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppSharedModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class UserProfileModule {}
