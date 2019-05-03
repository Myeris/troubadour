import {Action} from '@ngrx/store';
// app
import {AuthRequest} from '../../../models/auth-request.model';
import {User} from '../../../models/user.model';

export enum UserActionsTypes {
  LogIn = '[Login page] Log user in',
  LogInSuccess = '[AuthService] User logged in',
  LogInFail = '[AuthService] User log in failure',

  Register = '[Register page] Register user',
  RegisterSuccess = '[AuthService] User registered',
  RegisterFail = '[AuthService] User registration failed'
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

export class Register implements Action {
  public readonly type = UserActionsTypes.Register;

  constructor(public payload: { authRequest: AuthRequest }) {
  }
}

export class RegisterSuccess implements Action {
  public readonly type = UserActionsTypes.RegisterSuccess;

  constructor(public payload: { user: User }) {
  }
}

export class RegisterFail implements Action {
  public readonly type = UserActionsTypes.RegisterFail;

  constructor(public payload: { error: string }) {
  }
}

export type UserActions =
  | LogIn
  | LogInSuccess
  | LogInFail
  | Register
  | RegisterSuccess
  | RegisterFail;
