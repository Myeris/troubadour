import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
// app
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';

@NgModule({
  declarations: [SvgIconComponent, LifecycleComponent],
  exports: [SvgIconComponent, LifecycleComponent],
  imports: [CommonModule, MatIconModule, HttpClientModule]
})
export class AppSharedModule {}
