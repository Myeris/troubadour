import { AuthRequest } from '../../../auth/shared/models/auth-request.model';
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
  RemoveAccount,
  RemoveAccountFail,
  RemoveAccountSuccess,
  ResetPassword,
  ResetPasswordFail,
  ResetPasswordSuccess,
  SendVerificationEmail,
  SendVerificationEmailFail,
  SendVerificationEmailSuccess,
  SetPersistedUser,
  UserActionsTypes
} from './user.actions';
import { User } from '../../../auth/shared/models/user.model';
import { Constant } from 'src/app/shared/utils/enums/constants.utils';

const authRequest: AuthRequest = { email: 'email', password: 'password' };

describe('UserActions', () => {
  describe('Login', () => {
    it('should create an action', () => {
      const action = new LogIn({ authRequest });
      expect(action.type).toBe(UserActionsTypes.LogIn);
    });
  });

  describe('LogInSuccess', () => {
    it('should create an action', () => {
      const user = {} as User;
      const action = new LogInSuccess({ user });
      expect(action.type).toBe(UserActionsTypes.LogInSuccess);
    });
  });

  describe('LogInFail', () => {
    it('should create an action', () => {
      const error = 'this is an error';
      const action = new LogInFail({ error });
      expect(action.type).toBe(UserActionsTypes.LogInFail);
    });
  });

  describe('Register', () => {
    it('should create an action', () => {
      const action = new Register({ authRequest });
      expect(action.type).toBe(UserActionsTypes.Register);
    });
  });

  describe('RegisterSuccess', () => {
    it('should create an action', () => {
      const user = {} as User;
      const action = new RegisterSuccess({ user });
      expect(action.type).toBe(UserActionsTypes.RegisterSuccess);
    });
  });

  describe('RegisterFail', () => {
    it('should create an action', () => {
      const error = 'this is an error';
      const action = new RegisterFail({ error });
      expect(action.type).toBe(UserActionsTypes.RegisterFail);
    });
  });

  describe('LogOut', () => {
    it('should create an action', () => {
      const action = new LogOut();
      expect(action.type).toBe(UserActionsTypes.LogOut);
    });
  });

  describe('LogOutSuccess', () => {
    it('should create an action', () => {
      const action = new LogOutSuccess();
      expect(action.type).toBe(UserActionsTypes.LogOutSuccess);
    });
  });

  describe('ChangePassword', () => {
    it('should create an action', () => {
      const action = new ChangePassword({
        changePassword: { old: 'old', new: 'new', confirmed: 'new' }
      });
      expect(action.type).toBe(UserActionsTypes.ChangePassword);
    });
  });

  describe('ChangePasswordSuccess', () => {
    it('should create an action', () => {
      const action = new ChangePasswordSuccess({ message: Constant.UserChangePasswordSuccess });
      expect(action.type).toBe(UserActionsTypes.ChangePasswordSuccess);
    });
  });

  describe('ChangePasswordFail', () => {
    it('should create an action', () => {
      const action = new ChangePasswordFail({ error: '' });
      expect(action.type).toBe(UserActionsTypes.ChangePasswordFail);
    });
  });

  describe('RemoveAccount', () => {
    it('should create an action', () => {
      const action = new RemoveAccount();
      expect(action.type).toBe(UserActionsTypes.RemoveAccount);
    });
  });

  describe('RemoveAccountSuccess', () => {
    it('should create an action', () => {
      const action = new RemoveAccountSuccess();
      expect(action.type).toBe(UserActionsTypes.RemoveAccountSuccess);
    });
  });

  describe('RemoveAccountFail', () => {
    it('should create an action', () => {
      const action = new RemoveAccountFail({ error: 'error' });
      expect(action.type).toBe(UserActionsTypes.RemoveAccountFail);
    });
  });

  describe('SetPersistedUser', () => {
    it('should create an action', () => {
      const action = new SetPersistedUser({ user: null });
      expect(action.type).toBe(UserActionsTypes.SetPersistedUser);
    });
  });

  describe('ResetPassword', () => {
    it('should create an action', () => {
      const action = new ResetPassword({ email: 'email' });
      expect(action.type).toBe(UserActionsTypes.ResetPassword);
    });
  });

  describe('ResetPasswordSuccess', () => {
    it('should create an action', () => {
      const action = new ResetPasswordSuccess({ message: Constant.UserResetPasswordSuccess });
      expect(action.type).toBe(UserActionsTypes.ResetPasswordSuccess);
    });
  });

  describe('ResetPasswordFail', () => {
    it('should create an action', () => {
      const action = new ResetPasswordFail({ error: 'error' });
      expect(action.type).toBe(UserActionsTypes.ResetPasswordFail);
    });
  });

  describe('SendVerificationEmail', () => {
    it('should create an action', () => {
      const action = new SendVerificationEmail();
      expect(action.type).toBe(UserActionsTypes.SendVerificationEmail);
    });
  });

  describe('SendVerificationEmailSuccess', () => {
    it('should create an action', () => {
      const action = new SendVerificationEmailSuccess({ success: 'Check your email' });
      expect(action.type).toBe(UserActionsTypes.SendVerificationEmailSuccess);
    });
  });

  describe('SendVerificationEmailFail', () => {
    it('should create an action', () => {
      const action = new SendVerificationEmailFail({ error: 'This is an error' });
      expect(action.type).toBe(UserActionsTypes.SendVerificationEmailFail);
    });
  });
});
