import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
// app
import {AuthHeaderComponent} from './components/auth-header/auth-header.component';
import {AppSharedModule} from '../../shared/shared.module';
import {AuthFormComponent} from './components/auth-form/auth-form.component';
import {AuthFooterComponent} from './components/auth-footer/auth-footer.component';
import {appReducers} from './store/app.reducer';
import {UserEffects} from './store/user/effects/user.effects';
import {UserService} from './services/user.service';
import {AuthResource} from './resources/auth.resource';
import {environment} from '../../../environments/environment';

@NgModule({
  declarations: [
    AuthHeaderComponent,
    AuthFormComponent,
    AuthFooterComponent
  ],
  exports: [
    AuthHeaderComponent,
    AuthFormComponent,
    AuthFooterComponent
  ],
  providers: [
    UserService,
    AuthResource
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppSharedModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([
      UserEffects
    ])
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        UserService,
        AuthResource
      ]
    };
  }
}
