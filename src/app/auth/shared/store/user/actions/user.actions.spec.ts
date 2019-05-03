import {LogIn, LogInFail, LogInSuccess, Register, RegisterFail, RegisterSuccess, UserActionsTypes} from './user.actions';
import {User} from '../../../models/user.model';
import {AuthRequest} from '../../../models/auth-request.model';

const authRequest: AuthRequest = {email: 'email', password: 'password'};

describe('UserActions', () => {
  describe('Login', () => {
    it('should create an action', () => {
      const action = new LogIn({authRequest});
      expect(action.type).toBe(UserActionsTypes.LogIn);
    });
  });

  describe('LogInSuccess', () => {
    it('should create an action', () => {
      const user = {} as User;
      const action = new LogInSuccess({user});
      expect(action.type).toBe(UserActionsTypes.LogInSuccess);
    });
  });

  describe('LogInFail', () => {
    it('should create an action', () => {
      const error = 'this is an error';
      const action = new LogInFail({error});
      expect(action.type).toBe(UserActionsTypes.LogInFail);
    });
  });

  describe('Register', () => {
    it('should create an action', () => {
      const action = new Register({authRequest});
      expect(action.type).toBe(UserActionsTypes.Register);
    });
  });

  describe('RegisterSuccess', () => {
    it('should create an action', () => {
      const user = {} as User;
      const action = new RegisterSuccess({user});
      expect(action.type).toBe(UserActionsTypes.RegisterSuccess);
    });
  });

  describe('RegisterFail', () => {
    it('should create an action', () => {
      const error = 'this is an error';
      const action = new RegisterFail({error});
      expect(action.type).toBe(UserActionsTypes.RegisterFail);
    });
  });
});
