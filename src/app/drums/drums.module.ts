import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// app
import { DrumsRoutingModule } from './drums-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DrumsRoutingModule,
    SharedModule.forRoot()
  ]
})
export class DrumsModule {
}
