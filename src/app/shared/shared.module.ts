import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
// app
import {SvgIconComponent} from './components/svg-icon/svg-icon.component';
import {UserEffects} from './store/user/effects/user.effects';

@NgModule({
  declarations: [SvgIconComponent],
  exports: [
    SvgIconComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    EffectsModule.forRoot([
      UserEffects
    ])
  ]
})
export class AppSharedModule {
}
