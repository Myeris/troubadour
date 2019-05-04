import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {of, throwError} from 'rxjs';
import {cold, hot} from 'jasmine-marbles';
import SpyObj = jasmine.SpyObj;
// app
import {getActions, TestActions} from '../../../shared/utils/test-actions/test-actions.utils';
import {AppState} from '../../app.reducer';
import {PracticeSessionsResource} from '../../../drums/shared/resources/practice-sessions/practice-sessions.resource';
import {PracticeSessionsEffects} from './practice-sessions.effects';
import {PracticeSession} from '../../../drums/shared/models/practice-session.model';
import {PracticeSessionListLoad, PracticeSessionListLoadFail, PracticeSessionListLoadSuccess} from '../actions/practice-sessions.actions';
import {User} from '../../../auth/shared/models/user.model';
import {FirebaseError} from 'firebase';

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

const user: User = {
  email: 'email',
  id: '123',
  verified: true,
  authenticated: true
};

class PracticeSessionsResourceMock {
  getSessionList$() {
    return true;
  }
}

describe('PracticeSessionsEffects', () => {
  let actions$: TestActions;
  let practiceSessionsResource: PracticeSessionsResource;
  let effects: PracticeSessionsEffects;
  let store: SpyObj<Store<AppState>>;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        PracticeSessionsEffects,
        {provide: PracticeSessionsResource, useFactory: () => new PracticeSessionsResourceMock()},
        {provide: Actions, useFactory: getActions},
        {provide: Store, useValue: jasmine.createSpyObj('store', ['select'])}
      ]
    });

    store = bed.get(Store);
    actions$ = bed.get(Actions);
    practiceSessionsResource = bed.get(PracticeSessionsResource);
  });

  it('should be created', () => {
    effects = TestBed.get(PracticeSessionsEffects);
    expect(effects).toBeTruthy();
  });

  describe('loadPracticeSessionList$', () => {
    it('should return a list of practice sessions on success', () => {
      spyOn(practiceSessionsResource, 'getSessionList$').and.returnValue(of(sessions));

      const action = new PracticeSessionListLoad();
      const completion = new PracticeSessionListLoadSuccess({practiceSessionList: sessions});

      store.select.and.returnValue(cold('r', {r: user})); // Initializing the mock

      effects = TestBed.get(PracticeSessionsEffects); // Instantiate effects here so they can use the mock

      actions$.stream = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});

      expect(effects.loadPracticeSessionList$).toBeObservable(expected);
    });

    it('should return an error on fail', () => {
      const error: FirebaseError = {message: 'error'} as FirebaseError;
      spyOn(practiceSessionsResource, 'getSessionList$').and.callFake(() => throwError(error));

      const action = new PracticeSessionListLoad();
      const completion = new PracticeSessionListLoadFail({error: error.message});

      store.select.and.returnValue(cold('r', {r: user})); // Initializing the mock

      effects = TestBed.get(PracticeSessionsEffects); // Instantiate effects here so they can use the mock

      actions$.stream = hot('-a', {a: action});
      const expected = cold('-(c|)', {c: completion});

      expect(effects.loadPracticeSessionList$).toBeObservable(expected);
    });
  });
});
