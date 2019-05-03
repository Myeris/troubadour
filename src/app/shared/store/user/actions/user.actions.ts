import {Action} from '@ngrx/store';
import {User} from 'firebase';

export enum UserActionsTypes {
  LogIn = '[Login page] Log user in',
  LogInSuccess = '[AuthService] User logged in',
  LogInFail = '[AuthService] User log in failure'
}

export class LogIn implements Action {
  public readonly type = UserActionsTypes.LogIn;
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
