import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import UserCredential = firebase.auth.UserCredential;
import {catchError, map, pluck, switchMap} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
// app
import {AppState} from '../../app.reducer';
import {LogIn, LogInFail, LogInSuccess, UserActionsTypes} from '../actions/user.actions';
import {AuthRequest} from '../../../../auth/shared/models/auth-request.model';
import {AuthResource} from '../../../../auth/shared/resources/auth.resource';
import {UserService} from '../../../../auth/shared/services/user.service';

@Injectable()
export class UserEffects {

  @Effect()
  authenticateUser$: Observable<Action> = this.actions$
    .pipe(
      ofType<LogIn>(UserActionsTypes.LogIn),
      pluck('payload'),
      switchMap((authRequest: AuthRequest) => this.authResource.login(authRequest)),
      map((userCreds: UserCredential) => new LogInSuccess({user: this.userService.mapLoginResponse(userCreds)})),
      catchError((error: string) => of(new LogInFail({error})))
    );

  constructor(private actions$: Actions,
              private store$: Store<AppState>,
              private authResource: AuthResource,
              private userService: UserService) {
  }
}
