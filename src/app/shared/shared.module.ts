import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
// app
import {SvgIconComponent} from './components/svg-icon/svg-icon.component';

@NgModule({
  declarations: [SvgIconComponent],
  exports: [
    SvgIconComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule
  ]
})
export class AppSharedModule {
}
