import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material';
// app
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './containers/app.component';
import {AuthModule} from '../auth/auth.module';
import {AppHeaderComponent} from './components/app-header/app-header.component';
import {AppFooterComponent} from './components/app-footer/app-footer.component';
import {AppNavComponent} from './components/app-nav/app-nav.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppNavComponent
  ],
  imports: [
    BrowserModule,
    // 3rd party
    MatIconModule,
    // app
    AppRoutingModule,
    AuthModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
