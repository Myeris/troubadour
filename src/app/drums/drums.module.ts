import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
// app
import { DrumsRoutingModule } from './drums-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, DrumsRoutingModule, SharedModule.forRoot()]
})
export class DrumsModule {}
