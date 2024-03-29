import { initialUserState } from '../user.state';
import { userReducer } from './user.reducer';
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
  ResetPassword,
  ResetPasswordFail,
  ResetPasswordSuccess,
  SendVerificationEmail,
  SendVerificationEmailFail,
  SendVerificationEmailSuccess,
  SetPersistedUser,
  ResetFeedback
} from '../actions/user.actions';
import { AuthRequest } from '../../../auth/shared/models/auth-request.model';
import { User } from '../../../auth/shared/models/user.model';
import { Constant } from 'src/app/shared/utils/enums/constants.utils';
import { Feedback } from 'src/app/shared/models/feedback.model';

const user: User = {
  email: 'email',
  id: '12345',
  authenticated: true,
  verified: true
};

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
      const action = new LogIn({ authRequest: {} as AuthRequest });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.isLoggedIn).toBeFalsy();
      expect(state.selectedId).toBeNull();
      expect(state.feedback).toBeNull();
    });
  });

  describe('LogInSuccess', () => {
    it('should set the state', () => {
      const action = new LogInSuccess({ user });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.isLoggedIn).toBeTruthy();
      expect(state.entities[user.id]).toEqual(user);
      expect(state.selectedId).toBe(user.id);
      expect(state.feedback).toBeNull();
    });
  });

  describe('LogInFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new LogInFail({ error });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.isLoggedIn).toBeFalsy();
      expect(state.selectedId).toBeNull();
      expect(state.feedback.success).toBeFalsy();
      expect(state.feedback.message).toBe(error);
    });
  });

  describe('Register', () => {
    it('should set the state', () => {
      const action = new Register({ authRequest: {} as AuthRequest });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.isLoggedIn).toBeFalsy();
      expect(state.feedback).toBeNull();
      expect(state.selectedId).toBeNull();
    });
  });

  describe('RegisterSuccess', () => {
    it('should set the state', () => {
      const action = new RegisterSuccess({ user });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.isLoggedIn).toBeTruthy();
      expect(state.feedback).toBeNull();
      expect(state.entities[user.id]).toEqual(user);
      expect(state.selectedId).toBe(user.id);
    });
  });

  describe('RegisterFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new RegisterFail({ error });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.isLoggedIn).toBeFalsy();
      expect(state.feedback.success).toBeFalsy();
      expect(state.feedback.message).toBe(error);
      expect(state.selectedId).toBeNull();
    });
  });

  describe('LogOut', () => {
    it('should set the state', () => {
      const action = new LogOut();
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.isLoggedIn).toBeFalsy();
      expect(state.feedback).toBeNull();
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(0);
    });
  });

  describe('LogOutSuccess', () => {
    it('should set the state', () => {
      const action = new LogOutSuccess();
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.isLoggedIn).toBeFalsy();
      expect(state.feedback).toBeNull();
      expect(state.selectedId).toBeNull();
    });
  });

  describe('ChangePassword', () => {
    it('should set the state', () => {
      const action = new ChangePassword({ changePassword: { old: 'a', new: 'b', confirmed: 'b' } });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.isLoggedIn).toBeFalsy();
      expect(state.feedback).toBeNull();
      expect(state.selectedId).toBeNull();
    });
  });

  describe('ChangePasswordSuccess', () => {
    it('should set the state', () => {
      const action = new ChangePasswordSuccess({ message: Constant.UserChangePasswordSuccess });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.isLoggedIn).toBeFalsy();
      expect(state.feedback.success).toBeTruthy();
      expect(state.feedback.message).toBe(Constant.UserChangePasswordSuccess);
      expect(state.selectedId).toBeNull();
    });
  });

  describe('ChangePasswordFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new ChangePasswordFail({ error });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.isLoggedIn).toBeFalsy();
      expect(state.feedback.success).toBeFalsy();
      expect(state.feedback.message).toBe(error);
      expect(state.selectedId).toBeNull();
    });
  });

  describe('SetPersistedUser', () => {
    it('should set the state', () => {
      const action = new SetPersistedUser({ user });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.isLoggedIn).toBeTruthy();
      expect(state.feedback).toBeNull();
      expect(state.entities[user.id]).toEqual(user);
      expect(state.selectedId).toBe(user.id);
    });
  });

  describe('ResetPassword', () => {
    it('should set the state', () => {
      const action = new ResetPassword({ email: 'email' });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.isLoggedIn).toBeFalsy();
      expect(state.feedback).toBeNull();
      expect(state.selectedId).toBeNull();
    });
  });

  describe('ResetPasswordFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new ResetPasswordFail({ error });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.isLoggedIn).toBeFalsy();
      expect(state.feedback.success).toBeFalsy();
      expect(state.feedback.message).toBe(error);
      expect(state.selectedId).toBeNull();
    });
  });

  describe('ResetPasswordSuccess', () => {
    it('should set the state', () => {
      const action = new ResetPasswordSuccess({ message: Constant.UserResetPasswordSuccess });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.isLoggedIn).toBeFalsy();
      expect(state.feedback.success).toBeTruthy();
      expect(state.feedback.message).toBe(Constant.UserResetPasswordSuccess);
      expect(state.selectedId).toBeNull();
    });
  });

  describe('SendVerificationEmail', () => {
    it('should set the state', () => {
      const action = new SendVerificationEmail();
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.feedback).toBeNull();
      expect(state.selectedId).toBeNull();
    });
  });

  describe('SendVerificationEmailSuccess', () => {
    it('should set the state', () => {
      const action = new SendVerificationEmailSuccess({
        success: Constant.UserSendVerificationEmailSuccess
      });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.selectedId).toBeNull();
      expect(state.feedback.success).toBeTruthy();
      expect(state.feedback.message).toBe(Constant.UserSendVerificationEmailSuccess);
      expect(state.verificationEmailSent).toBeTruthy();
    });
  });

  describe('SendVerificationEmailFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new SendVerificationEmailFail({ error });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.selectedId).toBeNull();
      expect(state.feedback.success).toBeFalsy();
      expect(state.feedback.message).toBe(error);
    });
  });

  describe('ResetFeedback', () => {
    it('should reset the feedback', () => {
      const feedback: Feedback = { success: true, message: 'youpi' };
      const action = new ResetFeedback();
      const state = userReducer({ ...initialUserState, feedback }, action);

      expect(state.feedback).toBeNull();
    });
  });
});
