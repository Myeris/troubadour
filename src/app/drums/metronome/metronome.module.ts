import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
// app
import { MetronomeComponent } from './containers/metronome/metronome.component';
import { MetronomeRoutingModule } from './metronome-routing.module';
import { AppSharedModule } from '../../shared/shared.module';
import { MetronomeOptionsComponent } from './components/metronome-options/metronome-options.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MetronomeComponent, MetronomeOptionsComponent],
  exports: [MetronomeComponent, MetronomeOptionsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MetronomeRoutingModule,
    SharedModule,
    AppSharedModule
  ]
})
export class MetronomeModule {
}
