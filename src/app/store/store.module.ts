import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
// app
import {environment} from '../../environments/environment';
import {appReducers} from './app.reducer';
import {UserEffects} from './user/effects/user.effects';
import {PracticeSessionsEffects} from './practice-sessions/effects/practice-sessions.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([
      UserEffects,
      PracticeSessionsEffects
    ])
  ]
})
export class AppStoreModule {

}
