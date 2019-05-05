import {Store, StoreModule} from '@ngrx/store';
import {TestBed} from '@angular/core/testing';
// app
import {appReducers, AppState} from '../../app.reducer';
import {getError, isLoading} from './tabs.selector';
import {TabListLoad, TabListLoadFail, TabListLoadSuccess} from '../actions/tabs.actions';

describe('TabsSelectors', () => {
  let store: Store<AppState>;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducers)]
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

      store.dispatch(new TabListLoad());
      expect(result).toBeTruthy();

      store.dispatch(new TabListLoadFail({error: 'error'}));
      expect(result).toBeFalsy();

      store.dispatch(new TabListLoad());
      expect(result).toBeTruthy();

      store.dispatch(new TabListLoadSuccess({tabList: []}));
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

      store.dispatch(new TabListLoadFail({error}));
      expect(result).toBe(error);

      store.dispatch(new TabListLoad());
      expect(result).toBeNull();

      store.dispatch(new TabListLoadFail({error}));
      expect(result).toBe(error);

      store.dispatch(new TabListLoadSuccess({tabList: []}));
      expect(result).toBeNull();
    });
  });
});
