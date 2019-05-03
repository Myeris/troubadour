import {getActions, TestActions} from '../../../shared/utils/test-actions/test-actions.utils';
import {AuthResource} from '../../../auth/shared/resources/auth.resource';
import {UserEffects} from './user.effects';
import {async, TestBed} from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {appReducers} from '../../app.reducer';
import {Actions} from '@ngrx/effects';
import {UserService} from '../../../auth/shared/services/user.service';
import UserCredential = firebase.auth.UserCredential;
import {LogIn, LogInFail, LogInSuccess} from '../actions/user.actions';
import {AuthRequest} from '../../../auth/shared/models/auth-request.model';
import {cold, hot} from 'jasmine-marbles';
import {of, throwError} from 'rxjs';

class AuthResourceMock {
  login() {
    return true;
  }
}

const req: AuthRequest = {email: 'email', password: 'password'};

describe('UserEffects', () => {
  let actions$: TestActions;
  let authResource: AuthResource;
  let userService: UserService;
  let effects: UserEffects;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducers)],
      providers: [
        UserEffects,
        UserService,
        {provide: AuthResource, useFactory: () => new AuthResourceMock()},
        {provide: Actions, useFactory: getActions}
      ]
    });

    effects = bed.get(UserEffects);
    actions$ = bed.get(Actions);
    authResource = bed.get(AuthResource);
    userService = bed.get(UserService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('authenticateUser$', () => {
    it('should return a UserCredential object on success', async(() => {
      const userCreds: UserCredential = {
        user: {
          email: 'email',
          emailVerified: true,
          uid: '123'
        }
      } as UserCredential;

      spyOn(authResource, 'login').and.returnValue(of(userCreds));

      const action = new LogIn({authRequest: req});
      const completion = new LogInSuccess({user: userService.mapLoginResponse(userCreds)});

      actions$.stream = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});

      expect(effects.authenticateUser$).toBeObservable(expected);
    }));

    it('should return an error message on failure', async(() => {
      const action = new LogIn({authRequest: req});
      const error = 'this is an error';
      const completion = new LogInFail({error});

      spyOn(authResource, 'login').and.callFake(() => throwError(error));

      actions$.stream = hot('-a', {a: action});
      const expected = cold('-(c|)', {c: completion});

      expect(effects.authenticateUser$).toBeObservable(expected);
    }));
  });
});
