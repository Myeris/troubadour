import {Store, StoreModule} from '@ngrx/store';
import {TestBed} from '@angular/core/testing';
// app
import {appReducers, AppState} from '../../app.reducer';
import {getError, isLoading} from './practice-sessions.selector';
import {PracticeSessionListLoad, PracticeSessionListLoadFail, PracticeSessionListLoadSuccess} from '../actions/practice-sessions.actions';

describe('PracticeSessionsSelectors', () => {
  let store: Store<AppState>;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({...appReducers})]
    });

    store = bed.get(Store);
  });

  describe('isLoading', () => {
    it('should return the isLoading prop from the state', () => {
      let result = false;

      store
        .select(isLoading)
        .subscribe(value => result = value);

      expect(result).toBeFalsy();

      store.dispatch(new PracticeSessionListLoad());
      expect(result).toBeTruthy();

      store.dispatch(new PracticeSessionListLoadFail({error: 'error'}));
      expect(result).toBeFalsy();

      store.dispatch(new PracticeSessionListLoad());
      expect(result).toBeTruthy();

      store.dispatch(new PracticeSessionListLoadSuccess({practiceSessionList: []}));
      expect(result).toBeFalsy();
    });
  });

  describe('getError', () => {
    it('should return the error message', () => {
      const error = 'error';
      let result = null;

      store
        .select(getError)
        .subscribe(value => result = value);

      expect(result).toBeNull();

      store.dispatch(new PracticeSessionListLoadFail({error}));
      expect(result).toBe(error);

      store.dispatch(new PracticeSessionListLoad());
      expect(result).toBeNull();

      store.dispatch(new PracticeSessionListLoadFail({error}));
      expect(result).toBe(error);

      store.dispatch(new PracticeSessionListLoadSuccess({practiceSessionList: []}));
      expect(result).toBeNull();
    });
  });
});
