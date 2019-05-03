import {Action} from '@ngrx/store';
// app
import {AuthRequest} from '../../../../auth/shared/models/auth-request.model';
import {User} from '../../../../auth/shared/models/user.model';

export enum UserActionsTypes {
  LogIn = '[Login page] Log user in',
  LogInSuccess = '[AuthService] User logged in',
  LogInFail = '[AuthService] User log in failure'
}

export class LogIn implements Action {
  public readonly type = UserActionsTypes.LogIn;

  constructor(public payload: { authRequest: AuthRequest }) {
  }
}

export class LogInSuccess implements Action {
  public readonly type = UserActionsTypes.LogInSuccess;

  constructor(public payload: { user: User }) {
  }
}

export class LogInFail implements Action {
  public readonly type = UserActionsTypes.LogInFail;

  constructor(public payload: { error: string }) {
  }
}

export type UserActions =
  | LogIn
  | LogInSuccess
  | LogInFail;
