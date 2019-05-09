import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// app
import { AuthRequest } from '../models/auth-request.model';
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class AuthResource {
  constructor(private afAuth: AngularFireAuth) {
  }

  public login(authRequest: AuthRequest): Promise<UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(authRequest.email, authRequest.password);
  }

  public register(authRequest: AuthRequest): Promise<UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(authRequest.email, authRequest.password);
  }
}
