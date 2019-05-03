import {initialUserState} from '../user.state';
import {userReducer} from './user.reducer';
import {LogIn, LogInFail, LogInSuccess, Register, RegisterFail, RegisterSuccess} from '../actions/user.actions';
import {AuthRequest} from '../../../models/auth-request.model';
import {User} from '../../../models/user.model';

describe('userReducer', () => {
  describe('undefined actions', () => {
    it('should return the default state of the app', () => {
      const initialState = initialUserState;
      const action = {};
      // @ts-ignore because I'm trying to fool the reducer by passing non sense but TS keeps crying
      const state = userReducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('LogIn', () => {
    it('should set the state', () => {
      const action = new LogIn({authRequest: {} as AuthRequest});
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.isLoggedIn).toBeFalsy();
      expect(state.error).toBeNull();
    });
  });

  describe('LogInSuccess', () => {
    it('should set the state', () => {
      const action = new LogInSuccess({user: {} as User});
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.isLoggedIn).toBeTruthy();
      expect(state.error).toBeNull();
    });
  });

  describe('LogInFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new LogInFail({error});
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.isLoggedIn).toBeFalsy();
      expect(state.error).toBe(error);
    });
  });

  describe('Register', () => {
    it('should set the state', () => {
      const action = new Register({authRequest: {} as AuthRequest});
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.isLoggedIn).toBeFalsy();
      expect(state.error).toBeNull();
    });
  });

  describe('RegisterSuccess', () => {
    it('should set the state', () => {
      const action = new RegisterSuccess({user: {} as User});
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.isLoggedIn).toBeTruthy();
      expect(state.error).toBeNull();
    });
  });

  describe('RegisterFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new RegisterFail({error});
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.isLoggedIn).toBeFalsy();
      expect(state.error).toBe(error);
    });
  });
});
