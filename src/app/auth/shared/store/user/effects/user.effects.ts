import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import UserCredential = firebase.auth.UserCredential;
import {catchError, map, pluck, switchMap} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import FirestoreError = firebase.firestore.FirestoreError;
// app
import {AppState} from '../../app.reducer';
import {LogIn, LogInFail, LogInSuccess, Register, RegisterFail, RegisterSuccess, UserActionsTypes} from '../actions/user.actions';
import {AuthRequest} from '../../../models/auth-request.model';
import {AuthResource} from '../../../resources/auth.resource';
import {UserService} from '../../../services/user.service';

@Injectable()
export class UserEffects {

  @Effect()
  authenticateUser$: Observable<Action> = this.actions$
    .pipe(
      ofType<LogIn>(UserActionsTypes.LogIn),
      pluck('payload'),
      pluck('authRequest'),
      switchMap((authRequest: AuthRequest) => this.authResource.login(authRequest)),
      map((userCreds: UserCredential) => new LogInSuccess({user: this.userService.mapLoginResponse(userCreds)})),
      catchError((fe: FirestoreError) => of(new LogInFail({error: fe.message}))));

  @Effect()
  registerUser$: Observable<Action> = this.actions$
    .pipe(
      ofType<Register>(UserActionsTypes.Register),
      pluck('payload'),
      pluck('authRequest'),
      switchMap((authRequest: AuthRequest) => this.authResource.register(authRequest)),
      map((userCreds: UserCredential) => new RegisterSuccess({user: this.userService.mapLoginResponse(userCreds)})),
      catchError((fe: FirestoreError) => of(new RegisterFail({error: fe.message})))
    );

  constructor(private actions$: Actions,
              private store$: Store<AppState>,
              private authResource: AuthResource,
              private userService: UserService) {
  }
}
