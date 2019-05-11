import { Injectable } from '@angular/core';
// app
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthRequest } from '../models/auth-request.model';
import { ChangePassword } from '../models/change-password.model';
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

  public changePassword(email: string, changePassword: ChangePassword) {
    return this.login({ email, password: changePassword.old })
      .then(() => this.afAuth.auth.currentUser.updatePassword(changePassword.new))
      .catch(err => new Promise((resolve, reject) => reject(err)));
  }

  public removeAccount(): Promise<void> {
    return this.afAuth.auth.currentUser.delete(); // TODO remove the user's content by using Cloud Functions
  }
}
