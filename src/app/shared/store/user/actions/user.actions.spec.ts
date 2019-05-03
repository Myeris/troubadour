import {User} from 'firebase';
// app
import {LogIn, LogInFail, LogInSuccess, UserActionsTypes} from './user.actions';

describe('UserActions', () => {
  describe('Login', () => {
    it('should create an action', () => {
      const action = new LogIn();
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
});
