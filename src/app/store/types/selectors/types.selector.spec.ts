import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
// app
import { appReducers, AppState } from '../../app.reducer';
import { isLoading, getFeedback } from './types.selector';
import { TypesListLoad, TypesListLoadFail, TypesListLoadSuccess } from '../actions/types.actions';

describe('TypesSelector', () => {
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

      store.select(isLoading).subscribe(value => (result = value));

      expect(result).toBeFalsy();

      store.dispatch(new TypesListLoad());
      expect(result).toBeTruthy();

      store.dispatch(new TypesListLoadFail({ error: 'error' }));
      expect(result).toBeFalsy();

      store.dispatch(new TypesListLoad());
      expect(result).toBeTruthy();

      store.dispatch(new TypesListLoadSuccess({ types: [] }));
      expect(result).toBeFalsy();
    });
  });

  describe('getFeedback', () => {
    it('should return the error message', () => {
      const error = 'error';
      let result = null;

      store.select(getFeedback).subscribe(value => (result = value));

      expect(result).toBeNull();

      store.dispatch(new TypesListLoadFail({ error }));
      expect(result).toEqual({ success: false, message: error });

      store.dispatch(new TypesListLoad());
      expect(result).toBeNull();

      store.dispatch(new TypesListLoadFail({ error }));
      expect(result).toEqual({ success: false, message: error });

      store.dispatch(new TypesListLoadSuccess({ types: [] }));
      expect(result).toBeNull();
    });
  });
});
