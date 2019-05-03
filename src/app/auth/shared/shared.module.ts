import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
// app
import {AuthHeaderComponent} from './components/auth-header/auth-header.component';
import {AppSharedModule} from '../../shared/shared.module';
import {AuthFormComponent} from './components/auth-form/auth-form.component';
import {AuthFooterComponent} from './components/auth-footer/auth-footer.component';

@NgModule({
  declarations: [AuthHeaderComponent, AuthFormComponent, AuthFooterComponent],
  exports: [AuthHeaderComponent, AuthFormComponent, AuthFooterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppSharedModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
