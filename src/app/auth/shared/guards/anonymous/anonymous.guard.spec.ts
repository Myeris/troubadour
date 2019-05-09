import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
// app
import { AnonymousGuard } from './anonymous.guard';
import { User } from '../../models/user.model';
import { appReducers, AppState } from '../../../../store/app.reducer';
import { LogInSuccess } from '../../../../store/user/actions/user.actions';

describe('AnonymousGuard', () => {
  let guard: AnonymousGuard;
  let store: Store<AppState>;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [AnonymousGuard],
      imports: [
        StoreModule.forRoot({
          ...appReducers
        })
      ]
    });

    guard = bed.get(AnonymousGuard);
    store = bed.get(Store);
  });

  it('should be created', () => {
    const service: AnonymousGuard = TestBed.get(AnonymousGuard);
    expect(service).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should grant access to not logged in users', async(() => {
      let result = null;

      guard.canActivate(null, null)
        .subscribe((value) => result = value);
      expect(result).toBeTruthy();
    }));

    it('should not grand access to logged in user', () => {
      let result = null;

      store.dispatch(new LogInSuccess({ user: {} as User }));

      guard.canActivate(null, null)
        .subscribe((value) => result = value);

      expect(result).toBeFalsy();
    });
  });

  describe('canActivateChild', () => {
    it('should call canActivate', () => {
      spyOn(guard, 'canActivate').and.returnValue(of(true));

      guard.canActivateChild(null, null);

      expect(guard.canActivate).toHaveBeenCalledTimes(1);
      expect(guard.canActivate).toHaveBeenCalledWith(null, null);
    });
  });
});
