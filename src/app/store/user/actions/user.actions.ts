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
  RemoveAccountFail = '[AuthResourceAPI] Remove account fail',

  SetPersistedUser = '[App root page] Set user using persisted object in localstorage',

  ResetPassword = '[Reset password page] Reset password',
  ResetPasswordSuccess = '[AuthResourceAPI] Reset password success',
  ResetPasswordFail = '[AuthResourceAPI] Reset password fail',

  SendVerificationEmail = '[Login page] Send verification email',
  SendVerificationEmailSuccess = '[AuthResourceAPI] Send verification email success',
  SendVerificationEmailFail = '[AuthResourceAPI] Send verification email fail',

  ResetFeedback = '[Router Navigation] Reset user feedback'
}

export class LogIn implements Action {
  public readonly type = UserActionsTypes.LogIn;

  constructor(public payload: { authRequest: AuthRequest }) {}
}

export class LogInSuccess implements Action {
  public readonly type = UserActionsTypes.LogInSuccess;

  constructor(public payload: { user: User }) {}
}

export class LogInFail implements Action {
  public readonly type = UserActionsTypes.LogInFail;

  constructor(public payload: { error: string }) {}
}

export class Register implements Action {
  public readonly type = UserActionsTypes.Register;

  constructor(public payload: { authRequest: AuthRequest }) {}
}

export class RegisterSuccess implements Action {
  public readonly type = UserActionsTypes.RegisterSuccess;

  constructor(public payload: { user: User }) {}
}

export class RegisterFail implements Action {
  public readonly type = UserActionsTypes.RegisterFail;

  constructor(public payload: { error: string }) {}
}

export class LogOut implements Action {
  public readonly type = UserActionsTypes.LogOut;
}

export class LogOutSuccess implements Action {
  public readonly type = UserActionsTypes.LogOutSuccess;
}

export class ChangePassword implements Action {
  public readonly type = UserActionsTypes.ChangePassword;

  constructor(public payload: { changePassword: ChangePasswordModel }) {}
}

export class ChangePasswordSuccess implements Action {
  public readonly type = UserActionsTypes.ChangePasswordSuccess;

  constructor(public payload: { message: string }) {}
}

export class ChangePasswordFail implements Action {
  public readonly type = UserActionsTypes.ChangePasswordFail;

  constructor(public payload: { error: string }) {}
}

export class RemoveAccount implements Action {
  public readonly type = UserActionsTypes.RemoveAccount;
}

export class RemoveAccountSuccess implements Action {
  public readonly type = UserActionsTypes.RemoveAccountSuccess;
}

export class RemoveAccountFail implements Action {
  public readonly type = UserActionsTypes.RemoveAccountFail;

  constructor(public payload: { error: string }) {}
}

export class SetPersistedUser implements Action {
  public readonly type = UserActionsTypes.SetPersistedUser;

  constructor(public payload: { user: User }) {}
}

export class ResetPassword implements Action {
  public readonly type = UserActionsTypes.ResetPassword;

  constructor(public payload: { email: string }) {}
}

export class ResetPasswordSuccess implements Action {
  public readonly type = UserActionsTypes.ResetPasswordSuccess;

  constructor(public payload: { message: string }) {}
}

export class ResetPasswordFail implements Action {
  public readonly type = UserActionsTypes.ResetPasswordFail;

  constructor(public payload: { error: string }) {}
}

export class SendVerificationEmail implements Action {
  public readonly type = UserActionsTypes.SendVerificationEmail;
}

export class SendVerificationEmailSuccess implements Action {
  public readonly type = UserActionsTypes.SendVerificationEmailSuccess;

  constructor(public payload: { success: string }) {}
}

export class SendVerificationEmailFail implements Action {
  public readonly type = UserActionsTypes.SendVerificationEmailFail;

  constructor(public payload: { error: string }) {}
}

export class ResetFeedback implements Action {
  public readonly type = UserActionsTypes.ResetFeedback;
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
  | RemoveAccountFail
  | SetPersistedUser
  | ResetPassword
  | ResetPasswordSuccess
  | ResetPasswordFail
  | SendVerificationEmail
  | SendVerificationEmailSuccess
  | SendVerificationEmailFail
  | ResetFeedback;
