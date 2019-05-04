import {Store, StoreModule} from '@ngrx/store';
import {TestBed} from '@angular/core/testing';
// app
import {appReducers, AppState} from '../../app.reducer';
import {getError, getSelectedPracticeSession, isLoading} from './practice-sessions.selector';
import {
  PracticeSessionListLoad,
  PracticeSessionListLoadFail,
  PracticeSessionListLoadSuccess,
  PracticeSessionSelect
} from '../actions/practice-sessions.actions';
import {PracticeSession} from '../../../drums/shared/models/practice-session.model';

const sessions: PracticeSession[] = [
  {
    name: 'Single beat combination',
    exercises: [],
    repeat: 1,
    created: new Date().valueOf(),
    updated: new Date().valueOf(),
    shared: false,
    drumkit: false,
    $key: 'a',
    $exist: () => true
  },
  {
    name: 'Double beat combination',
    exercises: [],
    repeat: 1,
    created: new Date().valueOf(),
    updated: new Date().valueOf(),
    shared: false,
    drumkit: false,
    $key: 'b',
    $exist: () => true
  },
  {
    name: 'Triple beat combination',
    exercises: [],
    repeat: 1,
    created: new Date().valueOf(),
    updated: new Date().valueOf(),
    shared: false,
    drumkit: false,
    $key: 'c',
    $exist: () => true
  }
];

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

  describe('getSelectedPracticeSession', () => {
    it('should return the selected practice session', () => {
      const id = 'a';
      let result = null;

      store
        .select(getSelectedPracticeSession)
        .subscribe(value => result = value);

      expect(result).toBeUndefined();

      store.dispatch(new PracticeSessionListLoadSuccess({practiceSessionList: sessions}));

      store.dispatch(new PracticeSessionSelect({id}));
      expect(result).toEqual(sessions[0]);
    });
  });
});
