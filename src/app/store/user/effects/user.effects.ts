import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, pluck, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase';
// app
import { AppState } from '../../app.reducer';
import {
  ChangePassword,
  ChangePasswordFail,
  ChangePasswordSuccess,
  LogIn,
  LogInFail,
  LogInSuccess,
  LogOut,
  LogOutSuccess,
  Register,
  RegisterFail,
  RegisterSuccess,
  ResetPassword,
  ResetPasswordFail,
  ResetPasswordSuccess,
  SendVerificationEmail,
  SendVerificationEmailFail,
  SendVerificationEmailSuccess,
  UserActionsTypes
} from '../actions/user.actions';
import { AuthRequest } from '../../../auth/shared/models/auth-request.model';
import { AuthResource } from '../../../auth/shared/resources/auth.resource';
import { UserService } from '../../../auth/shared/services/user.service';
import { getCurrentUser } from '../selectors/user.selectors';
import { User } from '../../../auth/shared/models/user.model';
import { AuthErrors } from '../../../auth/shared/utils/errors.utils';
import FirestoreError = firebase.firestore.FirestoreError;
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class UserEffects {
  @Effect()
  authenticateUser$: Observable<Action> = this.actions$.pipe(
    ofType<LogIn>(UserActionsTypes.LogIn),
    pluck('payload'),
    pluck('authRequest'),
    switchMap((authRequest: AuthRequest) => this.authResource.login(authRequest)),
    map((userCreds: UserCredential) =>
      userCreds.user.emailVerified
        ? new LogInSuccess({ user: this.userService.mapLoginResponse(userCreds) })
        : new LogInFail({ error: AuthErrors.NotVerified })
    ),
    catchError((fe: FirestoreError) => of(new LogInFail({ error: fe.message })))
  );

  @Effect()
  registerUser$: Observable<Action | Action[]> = this.actions$.pipe(
    ofType<Register>(UserActionsTypes.Register),
    pluck('payload'),
    pluck('authRequest'),
    switchMap((authRequest: AuthRequest) => this.authResource.register(authRequest)),
    map((userCreds: UserCredential) => [
      new RegisterSuccess({ user: this.userService.mapLoginResponse(userCreds) }),
      new SendVerificationEmail()
    ]),
    catchError((fe: FirestoreError) => of(new RegisterFail({ error: fe.message })))
  );

  @Effect({ dispatch: false })
  redirectConnectedUserAfterLogin$: Observable<void> = this.actions$.pipe(
    ofType<LogInSuccess>(UserActionsTypes.LogInSuccess),
    map(action => this.userService.persistUser(action.payload.user)),
    tap(() => this.router.navigate(['/']))
  );

  // TODO dispatch send verification email message
  @Effect({ dispatch: false })
  redirectConnectedUserAfterRegister$: Observable<void> = this.actions$.pipe(
    ofType<RegisterSuccess>(UserActionsTypes.RegisterSuccess),
    map(action => this.userService.persistUser(action.payload.user)),
    tap(() => this.router.navigate(['/']))
  );

  @Effect()
  logoutUser$: Observable<Action> = this.actions$.pipe(
    ofType<LogOut>(UserActionsTypes.LogOut),
    map(() => this.userService.removePersistedUser()),
    map(() => new LogOutSuccess()),
    tap(() => this.router.navigate(['/auth']))
  );

  @Effect()
  changePassword$: Observable<Action> = this.actions$.pipe(
    ofType<ChangePassword>(UserActionsTypes.ChangePassword),
    withLatestFrom(this.store$.select<User>(getCurrentUser)),
    switchMap(([action, currentUser]) =>
      this.authResource.changePassword(currentUser.email, action.payload.changePassword)
    ),
    map(() => new ChangePasswordSuccess()),
    catchError((error: FirebaseError) => of(new ChangePasswordFail({ error: error.message })))
  );

  @Effect()
  resetPassword$: Observable<Action> = this.actions$.pipe(
    ofType<ResetPassword>(UserActionsTypes.ResetPassword),
    pluck('payload'),
    pluck('email'),
    switchMap((email: string) => this.authResource.resetPassword(email)),
    map(() => new ResetPasswordSuccess()),
    catchError((error: FirebaseError) => of(new ResetPasswordFail({ error: error.message })))
  );

  @Effect()
  sendVerificationEmail$: Observable<Action> = this.actions$.pipe(
    ofType<SendVerificationEmail>(UserActionsTypes.SendVerificationEmail),
    withLatestFrom(this.store$.select<User>(getCurrentUser)),
    switchMap(([action, currentUser]) => this.authResource.sendVerificationEmail()),
    map(
      () =>
        new SendVerificationEmailSuccess({
          success: 'A verification email has been send to you. Please check your inbox.'
        })
    ),
    catchError((error: FirebaseError) =>
      of(new SendVerificationEmailFail({ error: error.message }))
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private router: Router,
    private authResource: AuthResource,
    private userService: UserService
  ) {}
}
