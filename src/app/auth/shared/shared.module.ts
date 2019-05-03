import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
// app
import {AuthHeaderComponent} from './components/auth-header/auth-header.component';
import {AppSharedModule} from '../../shared/shared.module';
import {AuthFormComponent} from './components/auth-form/auth-form.component';

@NgModule({
  declarations: [AuthHeaderComponent, AuthFormComponent],
  exports: [AuthHeaderComponent, AuthFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppSharedModule
  ]
})
export class SharedModule {
}
