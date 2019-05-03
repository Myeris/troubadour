import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// app
import {AuthHeaderComponent} from './components/auth-header/auth-header.component';
import {AppSharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [AuthHeaderComponent],
  exports: [AuthHeaderComponent],
  imports: [
    CommonModule,
    AppSharedModule
  ]
})
export class SharedModule {
}
