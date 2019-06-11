import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// app
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app/app.component';
import { AuthModule } from '../auth/auth.module';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { AppSharedModule } from '../shared/shared.module';
import { DrumsModule } from '../drums/drums.module';
import { AppStoreModule } from '../store/store.module';
import { LegalsComponent } from './containers/legals/legals.component';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppNavComponent,
    LegalsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // 3rd party
    MatIconModule,
    // app
    AppRoutingModule,
    AuthModule,
    DrumsModule,
    UserModule,
    AppStoreModule,
    AppSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
