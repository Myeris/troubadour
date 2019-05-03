import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {User as FbUser} from 'firebase';
// app
import {User} from '../models/user.model';
import {AppState} from '../../../shared/store/app.reducer';


// TODO change this to use NGRX

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public auth$: Observable<FbUser | null> = this.af.authState
    .pipe(
      tap(
        (next: any) => {
          if (!next || !next.emailVerified) {
            // this.store.set('user', null);
          }

          if (next) {
            const user: User = {
              email: next.email,
              uid: next.uid,
              authenticated: true,
              verified: next.emailVerified,
              creationDate: new Date(next.metadata.creationTime).valueOf()
            };

            this.store.set('user', user);
          }
        },
        error => new Error(error))
    );

  constructor(private af: AngularFireAuth,
              private store: Store<AppState>) {
  }

  public get user(): FbUser | null {
    return this.af.auth.currentUser;
  }

  public get isLoggedIn(): boolean {
    return this.user && this.user.emailVerified;
  }

  public get authState(): Observable<FbUser | null> {
    return this.af.authState;
  }

  public createUser(email: string, password: string): Promise<any> {
    return this.af.auth
      .createUserWithEmailAndPassword(email, password);
  }

  public removeUser(): Promise<any> {
    return this.user.delete(); // TODO remove the user's content by using Cloud Functions
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.af.auth
      .signInWithEmailAndPassword(email, password);
  }

  public logoutUser(): Promise<any> {
    return this.af.auth
      .signOut();
  }

  public changePassword(obj: { old: string, new: string, confirmed: string }): Promise<any> {
    return this.loginUser(this.user.email, obj.old)
      .then(() => this.af.auth.currentUser.updatePassword(obj.new))
      .catch(err => new Promise((resolve, reject) => reject(err)));
  }

  public resetPassword(email: string): Promise<any> {
    return this.af.auth.sendPasswordResetEmail(email);
  }

  public sendVerificationEmail(): Promise<any> {
    return this.af.auth.currentUser.sendEmailVerification();
  }
}
