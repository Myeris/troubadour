import { AuthRequest } from '../../../auth/shared/models/auth-request.model';
import {
  LogIn,
  LogInFail,
  LogInSuccess,
  LogOut,
  LogOutSuccess,
  Register,
  RegisterFail,
  RegisterSuccess,
  UserActionsTypes
} from './user.actions';
import { User } from '../../../auth/shared/models/user.model';

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
});
