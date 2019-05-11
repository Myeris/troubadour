import { Action } from '@ngrx/store';
// app
import { AuthRequest } from '../../../auth/shared/models/auth-request.model';
import { User } from '../../../auth/shared/models/user.model';
import { ChangePassword as ChangePasswordModel } from '../../../auth/shared/models/change-password.model';

export enum UserActionsTypes {
  LogIn = '[Login page] Log user in',
  LogInSuccess = '[AuthService] User logged in',
  LogInFail = '[AuthResourceAPI] User log in failure',

  Register = '[Register page] Register user',
  RegisterSuccess = '[AuthResourceAPI] User registered',
  RegisterFail = '[AuthResourceAPI] User registration failed',

  LogOut = '[App header bar] Log out',
  LogOutSuccess = '[AuthResourceAPI] Log out success',
  LogOutFail = '[AuthResourceAPI] Log out fail', // TODO

  ChangePassword = '[User profile page] Change password',
  ChangePasswordSuccess = '[AuthResourceAPI] Change password success',
  ChangePasswordFail = '[AuthResourceAPI] Change password fail',

  RemoveAccount = '[User profile page] Remove account',
  RemoveAccountSuccess = '[AuthResourceAPI] Remove account success',
  RemoveAccountFail = '[AuthResourceAPI] Remove account fail'
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

export class LogOut implements Action {
  public readonly type = UserActionsTypes.LogOut;
}

export class LogOutSuccess implements Action {
  public readonly type = UserActionsTypes.LogOutSuccess;
}

export class ChangePassword implements Action {
  public readonly type = UserActionsTypes.ChangePassword;

  constructor(public payload: { changePassword: ChangePasswordModel }) {
  }
}

export class ChangePasswordSuccess implements Action {
  public readonly type = UserActionsTypes.ChangePasswordSuccess;
}

export class ChangePasswordFail implements Action {
  public readonly type = UserActionsTypes.ChangePasswordFail;

  constructor(public payload: { error: string }) {
  }
}

export class RemoveAccount implements Action {
  public readonly type = UserActionsTypes.RemoveAccount;
}

export class RemoveAccountSuccess implements Action {
  public readonly type = UserActionsTypes.RemoveAccountSuccess;
}

export class RemoveAccountFail implements Action {
  public readonly type = UserActionsTypes.RemoveAccountFail;

  constructor(public payload: { error: string }) {
  }
}

export type UserActions =
  | LogIn
  | LogInSuccess
  | LogInFail
  | Register
  | RegisterSuccess
  | RegisterFail
  | LogOut
  | LogOutSuccess
  | ChangePassword
  | ChangePasswordSuccess
  | ChangePasswordFail
  | RemoveAccount
  | RemoveAccountSuccess
  | RemoveAccountFail;
