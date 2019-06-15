import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
// app
import { UserEffects } from './user.effects';
import { appReducers, AppState } from '../../app.reducer';
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
  SendVerificationEmailSuccess
} from '../actions/user.actions';
import { AuthRequest } from '../../../auth/shared/models/auth-request.model';
import { getActions, TestActions } from '../../../shared/utils/test-actions/test-actions.utils';
import { AuthResource } from '../../../auth/shared/resources/auth.resource';
import { UserService } from '../../../auth/shared/services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../../../auth/shared/models/user.model';
import UserCredential = firebase.auth.UserCredential;
import FirestoreError = firebase.firestore.FirestoreError;
import SpyObj = jasmine.SpyObj;
import { AuthErrors } from '../../../auth/shared/utils/errors.utils';
import { Constant } from 'src/app/shared/utils/enums/constants.utils';

class AuthResourceMock {
  login() {
    return true;
  }

  register() {
    return true;
  }

  changePassword() {
    return true;
  }

  resetPassword() {
    return true;
  }

  sendVerificationEmail() {
    return true;
  }
}

const req: AuthRequest = { email: 'email', password: 'password' };
const user: User = {
  email: 'email',
  id: '123',
  verified: true,
  authenticated: true
};

describe('UserEffects', () => {
  let actions$: TestActions;
  let authResource: AuthResource;
  let userService: UserService;
  let store: SpyObj<Store<AppState>>;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducers), RouterTestingModule],
      providers: [
        UserEffects,
        UserService,
        { provide: AuthResource, useClass: AuthResourceMock },
        { provide: Actions, useFactory: getActions },
        { provide: Store, useValue: jasmine.createSpyObj('store', ['select']) }
      ]
    });

    store = bed.get(Store);
    actions$ = bed.get(Actions);
    authResource = bed.get(AuthResource);
    userService = bed.get(UserService);
  });

  it('should be created', () => {
    const effects: UserEffects = TestBed.get(UserEffects);
    expect(effects).toBeTruthy();
  });

  describe('authenticateUser$', () => {
    it('should return a UserCredential object on success', async(() => {
      const effects: UserEffects = TestBed.get(UserEffects);
      const userCreds: UserCredential = {
        user: {
          email: 'email',
          emailVerified: true,
          uid: '123'
        }
      } as UserCredential;

      spyOn(authResource, 'login').and.returnValue(of(userCreds));

      const action = new LogIn({ authRequest: req });
      const completion = new LogInSuccess({ user: userService.mapLoginResponse(userCreds) });

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.authenticateUser$).toBeObservable(expected);
    }));

    it('should return an error message if user not verified', async(() => {
      const effects: UserEffects = TestBed.get(UserEffects);
      const userCreds: UserCredential = {
        user: {
          email: 'email',
          emailVerified: false,
          uid: '123'
        }
      } as UserCredential;

      spyOn(authResource, 'login').and.returnValue(of(userCreds));

      const action = new LogIn({ authRequest: req });
      const error = AuthErrors.NotVerified;
      const completion = new LogInFail({ error });

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.authenticateUser$).toBeObservable(expected);
    }));

    it('should return an error message on failure', async(() => {
      const effects: UserEffects = TestBed.get(UserEffects);
      const action = new LogIn({ authRequest: req });
      const error = 'this is an error';
      const completion = new LogInFail({ error });

      spyOn(authResource, 'login').and.callFake(() =>
        throwError({ message: error } as FirestoreError)
      );

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.authenticateUser$).toBeObservable(expected);
    }));
  });

  describe('registerUser$', () => {
    it('should return a UserCredential object on success', async(() => {
      const effects: UserEffects = TestBed.get(UserEffects);
      const userCreds: UserCredential = {
        user: {
          email: 'email',
          emailVerified: true,
          uid: '123'
        }
      } as UserCredential;

      spyOn(authResource, 'register').and.returnValue(of(userCreds));

      const action = new Register({ authRequest: req });
      const completion = new RegisterSuccess({ user: userService.mapLoginResponse(userCreds) });

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.registerUser$).toBeObservable(expected);
    }));

    it('should return an error message on failure', async(() => {
      const effects: UserEffects = TestBed.get(UserEffects);
      const action = new Register({ authRequest: req });
      const error = 'this is an error';
      const completion = new RegisterFail({ error });

      spyOn(authResource, 'register').and.callFake(() =>
        throwError({ message: error } as FirestoreError)
      );

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(c|)', { c: completion });

      expect(effects.registerUser$).toBeObservable(expected);
    }));
  });

  describe('redirectConnectedUserAfterLogin$', () => {
    it('should persistUser and redirect on LoginSuccess', () => {
      spyOn(userService, 'persistUser').and.returnValue(true);
      const action = new LogInSuccess({ user });

      actions$.stream = hot('-a|', { a: action });

      const effects: UserEffects = TestBed.get(UserEffects);

      effects.redirectConnectedUserAfterLogin$.subscribe(x => {
        expect(userService.persistUser).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('redirectConnectedUserAfterRegister$', () => {
    it('should persistUser and redirect on RegisterSuccess', () => {
      spyOn(userService, 'persistUser').and.returnValue(true);
      const action = new RegisterSuccess({ user });

      actions$.stream = hot('-a|', { a: action });

      const effects: UserEffects = TestBed.get(UserEffects);

      effects.redirectConnectedUserAfterRegister$.subscribe(x => {
        expect(userService.persistUser).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('logoutUser', () => {
    it('should log the user out and redirect', () => {
      const action = new LogOut();
      const completion = new LogOutSuccess();

      spyOn(userService, 'removePersistedUser').and.returnValue(of(true));

      const effects: UserEffects = TestBed.get(UserEffects);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.logoutUser$).toBeObservable(expected);

      // TODO test redirect call
    });
  });

  describe('changePassword$', () => {
    it('should return a success action', () => {
      const changePassword = { old: 'a', new: 'b', confirmed: 'b' };

      const action = new ChangePassword({ changePassword });
      const completion = new ChangePasswordSuccess({ message: Constant.UserChangePasswordSuccess });

      spyOn(authResource, 'changePassword').and.returnValue(of(true));

      store.select.and.returnValue(cold('r', { r: user })); // Initializing the mock

      const effects: UserEffects = TestBed.get(UserEffects);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.changePassword$).toBeObservable(expected);
    });

    it('should return an error message', () => {
      const action = new ChangePassword({ changePassword: { new: 'a', old: 'b', confirmed: 'b' } });
      const error = 'error';
      const completion = new ChangePasswordFail({ error });

      spyOn(authResource, 'changePassword').and.returnValue(throwError({ message: error }));

      store.select.and.returnValue(cold('r', { r: user })); // Initializing the mock

      const effects: UserEffects = TestBed.get(UserEffects);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(c|)', { c: completion });

      expect(effects.changePassword$).toBeObservable(expected);
    });
  });

  describe('resetPassword$', () => {
    it('should return a success action', () => {
      const action = new ResetPassword({ email: 'email' });
      const completion = new ResetPasswordSuccess({
        message: Constant.UserResetPasswordSuccess
      });

      spyOn(authResource, 'resetPassword').and.returnValue(of({}));

      const effects: UserEffects = TestBed.get(UserEffects);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.resetPassword$).toBeObservable(expected);
    });

    it('should return an error message', () => {
      const action = new ResetPassword({ email: 'email' });
      const error = 'error';
      const completion = new ResetPasswordFail({ error });

      spyOn(authResource, 'resetPassword').and.returnValue(throwError({ message: error }));

      const effects: UserEffects = TestBed.get(UserEffects);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(c|)', { c: completion });

      expect(effects.resetPassword$).toBeObservable(expected);
    });
  });

  describe('sendVerificationEmail$', () => {
    it('should dispatch a success action', () => {
      const action = new SendVerificationEmail();
      const completion = new SendVerificationEmailSuccess({
        success: Constant.UserSendVerificationEmailSuccess
      });

      spyOn(authResource, 'sendVerificationEmail').and.returnValue(of(true));

      store.select.and.returnValue(cold('r', { r: user }));

      const effects: UserEffects = TestBed.get(UserEffects);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.sendVerificationEmail$).toBeObservable(expected);
    });

    it('should dispatch a false action', () => {
      const action = new SendVerificationEmail();
      const error = 'error';
      const completion = new SendVerificationEmailFail({ error });

      spyOn(authResource, 'sendVerificationEmail').and.returnValue(throwError({ message: error }));

      store.select.and.returnValue(cold('r', { r: user })); // Initializing the mock

      const effects: UserEffects = TestBed.get(UserEffects);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(c|)', { c: completion });

      expect(effects.sendVerificationEmail$).toBeObservable(expected);
    });
  });
});
