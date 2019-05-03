import {Injectable} from '@angular/core';
import UserCredential = firebase.auth.UserCredential;
import {AngularFireAuth} from '@angular/fire/auth';
// app
import {AuthRequest} from '../models/auth-request.model';

@Injectable()
export class AuthResource {
  constructor(private afAuth: AngularFireAuth) {
  }

  public login(authRequest: AuthRequest): Promise<UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(authRequest.email, authRequest.password);
  }
}
