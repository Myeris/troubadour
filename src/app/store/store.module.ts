import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {appReducers} from './app.reducer';
import {UserEffects} from './user/effects/user.effects';
// app

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([
      UserEffects
    ])
  ]
})
export class AppStoreModule {
}
