import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// app
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './shared/shared.module';

export const firebaseConfig = {
  apiKey: 'AIzaSyAAPo3qoSzFGJkEeWMd7cq8a2UuPT8xYTI',
  authDomain: 'drums-101.firebaseapp.com',
  databaseURL: 'https://drums-101.firebaseio.com',
  projectId: 'drums-101',
  storageBucket: 'drums-101.appspot.com',
  messagingSenderId: '395707803889'
};

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    // third party
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    // app
    AuthRoutingModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule {
}
