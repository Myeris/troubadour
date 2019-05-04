import {TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
// app
import {appReducers, AppState} from '../../app.reducer';
import {getCurrentUser, getError, isLoading, isLoggedIn} from './user.selectors';
import {LogIn, LogInFail, LogInSuccess} from '../actions/user.actions';
import {AuthRequest} from '../../../auth/shared/models/auth-request.model';
import {User} from '../../../auth/shared/models/user.model';

const user: User = {
  email: 'email',
  id: '123',
  authenticated: true,
  verified: true
};

describe('UserSelectors', () => {
  let store: Store<AppState>;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...appReducers,
        })
      ]
    });

    store = bed.get(Store);
  });

  describe('isLoading', () => {
    it('should return the isLoading prop from the state', () => {
      let result = false;

      store
        .select(isLoading)
        .subscribe(value => (result = value));

      expect(result).toBeFalsy();

      store.dispatch(new LogIn({authRequest: {} as AuthRequest}));
      expect(result).toBeTruthy();

      store.dispatch(new LogInSuccess({user: {} as User}));
      expect(result).toBeFalsy();

      store.dispatch(new LogIn({authRequest: {} as AuthRequest}));
      expect(result).toBeTruthy();

      store.dispatch(new LogInFail({error: 'toto'}));
      expect(result).toBeFalsy();
    });
  });

  describe('isLoggedIn', () => {
    it('should return the isLoggedIn prop from the state', () => {
      let result = false;

      store
        .select(isLoggedIn)
        .subscribe(value => (result = value));

      expect(result).toBeFalsy();

      store.dispatch(new LogIn({authRequest: {} as AuthRequest}));
      expect(result).toBeFalsy();

      store.dispatch(new LogInSuccess({user: {} as User}));
      expect(result).toBeTruthy();

      store.dispatch(new LogInFail({error: 'toto'}));
      expect(result).toBeFalsy();
    });
  });

  describe('getError', () => {
    it('should return the getError prop from the state', () => {
      let result = null;

      store
        .select(getError)
        .subscribe(value => (result = value));

      expect(result).toBeNull();

      store.dispatch(new LogIn({authRequest: {} as AuthRequest}));
      expect(result).toBeNull();

      store.dispatch(new LogInFail({error: 'toto'}));
      expect(result).toBe('toto');

      store.dispatch(new LogInSuccess({user: {} as User}));
      expect(result).toBeNull();
    });
  });

  describe('getCurrentUser', () => {
    it('should return the current user', () => {
      let result = null;

      store
        .select(getCurrentUser)
        .subscribe(value => result = value);

      expect(result).toBeNull();

      store.dispatch(new LogInSuccess({user}));
      expect(result).toEqual(user);
    });
  });
});
