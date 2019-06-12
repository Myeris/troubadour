import { async, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import { FirebaseError } from 'firebase';
import { RouterTestingModule } from '@angular/router/testing';
// app
import { getActions, TestActions } from '../../../shared/utils/test-actions/test-actions.utils';
import { AppState } from '../../app.reducer';
import { PracticeSessionsResource } from '../../../drums/shared/resources/practice-sessions/practice-sessions.resource';
import { PracticeSessionsEffects } from './practice-sessions.effects';
import { PracticeSession } from '../../../drums/shared/models/practice-session.model';
import {
  PracticeSessionCreate,
  PracticeSessionCreateFail,
  PracticeSessionCreateSuccess,
  PracticeSessionDelete,
  PracticeSessionDeleteFail,
  PracticeSessionDeleteSuccess,
  PracticeSessionListLoad,
  PracticeSessionListLoadFail,
  PracticeSessionListLoadSuccess,
  PracticeSessionUpdate,
  PracticeSessionUpdateSuccess,
  PracticeSessionUpdateFail
} from '../actions/practice-sessions.actions';
import { User } from '../../../auth/shared/models/user.model';
import { Router } from '@angular/router';
import SpyObj = jasmine.SpyObj;
import FirestoreError = firebase.firestore.FirestoreError;
import { Constant } from 'src/app/shared/utils/enums/constants.utils';

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
  getSessionList$() {}

  removeSession() {}

  createSession() {}

  updateSession() {}
}

describe('PracticeSessionsEffects', () => {
  let actions$: TestActions;
  let practiceSessionsResource: PracticeSessionsResource;
  let effects: PracticeSessionsEffects;
  let store: SpyObj<Store<AppState>>;
  let router: Router;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        PracticeSessionsEffects,
        { provide: PracticeSessionsResource, useFactory: () => new PracticeSessionsResourceMock() },
        { provide: Actions, useFactory: getActions },
        { provide: Store, useValue: jasmine.createSpyObj('store', ['select']) }
      ],
      imports: [RouterTestingModule]
    });

    store = bed.get(Store);
    actions$ = bed.get(Actions);
    practiceSessionsResource = bed.get(PracticeSessionsResource);
    router = bed.get(Router);
  });

  it('should be created', () => {
    effects = TestBed.get(PracticeSessionsEffects);
    expect(effects).toBeTruthy();
  });

  describe('loadPracticeSessionList$', () => {
    it('should return a list of practice sessions on success', () => {
      spyOn(practiceSessionsResource, 'getSessionList$').and.returnValue(of(sessions));

      const action = new PracticeSessionListLoad();
      const completion = new PracticeSessionListLoadSuccess({ practiceSessionList: sessions });

      store.select.and.returnValue(cold('r', { r: user })); // Initializing the mock

      effects = TestBed.get(PracticeSessionsEffects); // Instantiate effects here so they can use the mock

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadPracticeSessionList$).toBeObservable(expected);
    });

    it('should return an error on fail', () => {
      const error: FirebaseError = { message: 'error' } as FirebaseError;
      spyOn(practiceSessionsResource, 'getSessionList$').and.callFake(() => throwError(error));

      const action = new PracticeSessionListLoad();
      const completion = new PracticeSessionListLoadFail({ error: error.message });

      store.select.and.returnValue(cold('r', { r: user })); // Initializing the mock

      effects = TestBed.get(PracticeSessionsEffects); // Instantiate effects here so they can use the mock

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(c|)', { c: completion });

      expect(effects.loadPracticeSessionList$).toBeObservable(expected);
    });
  });

  describe('removePracticeSession$', () => {
    it('should return a Success event', async(() => {
      spyOn(practiceSessionsResource, 'removeSession').and.returnValue(of([]));

      const id = 'id';
      const action = new PracticeSessionDelete({ id });
      const completion = new PracticeSessionDeleteSuccess({
        message: Constant.PracticeSessionDeleteSuccess
      });

      store.select.and.returnValue(cold('r', { r: user })); // Initializing the mock

      effects = TestBed.get(PracticeSessionsEffects); // Instantiate effects here so they can use the mock

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.removePracticeSession$).toBeObservable(expected);
    }));

    it('should return an error message on failure', async(() => {
      const id = 'id';
      const error = 'this is an error';

      spyOn(practiceSessionsResource, 'removeSession').and.callFake(() =>
        throwError({ message: error } as FirestoreError)
      );

      const action = new PracticeSessionDelete({ id });

      const completion = new PracticeSessionDeleteFail({ error });

      store.select.and.returnValue(cold('r', { r: user })); // Initializing the mock

      effects = TestBed.get(PracticeSessionsEffects);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(c|)', { c: completion });

      expect(effects.removePracticeSession$).toBeObservable(expected);
    }));
  });

  describe('createPracticeSession$', () => {
    it('should return a Success event', async(() => {
      spyOn(practiceSessionsResource, 'createSession').and.returnValue(of({}));

      const practiceSession = {} as PracticeSession;
      const action = new PracticeSessionCreate({ practiceSession });
      const completion = new PracticeSessionCreateSuccess({
        message: Constant.PracticeSessionCreateSuccess
      });

      store.select.and.returnValue(cold('r', { r: user })); // Initializing the mock

      effects = TestBed.get(PracticeSessionsEffects); // Instantiate effects here so they can use the mock

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.createPracticeSession$).toBeObservable(expected);
    }));

    it('should return an error message on failure', async(() => {
      const error = 'this is an error';
      spyOn(practiceSessionsResource, 'createSession').and.callFake(() =>
        throwError({ message: error } as FirestoreError)
      );

      const action = new PracticeSessionCreate({ practiceSession: {} as PracticeSession });
      const completion = new PracticeSessionCreateFail({ error });

      store.select.and.returnValue(cold('r', { r: user })); // Initializing the mock

      effects = TestBed.get(PracticeSessionsEffects);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(c|)', { c: completion });

      expect(effects.createPracticeSession$).toBeObservable(expected);
    }));
  });

  describe('updatePracticeSession$', () => {
    it('should dispatch a Success action', () => {
      spyOn(practiceSessionsResource, 'updateSession').and.returnValue(of({}));

      const practiceSession = { $key: 'key' } as PracticeSession;
      const action = new PracticeSessionUpdate({ practiceSession });
      const completion = new PracticeSessionUpdateSuccess({
        message: Constant.PracticeSessionUpdateSuccess
      });

      store.select.and.returnValue(cold('r', { r: user })); // Initializing the mock

      effects = TestBed.get(PracticeSessionsEffects); // Instantiate effects here so they can use the mock

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.updatePracticeSession$).toBeObservable(expected);
    });

    it('should dispatch an Error action', () => {
      const practiceSession = { $key: 'key' } as PracticeSession;
      const error = 'this is an error';
      spyOn(practiceSessionsResource, 'updateSession').and.callFake(() =>
        throwError({ message: error } as FirebaseError)
      );

      const action = new PracticeSessionUpdate({ practiceSession });
      const completion = new PracticeSessionUpdateFail({ error });

      store.select.and.returnValue(cold('r', { r: user })); // Initializing the mock

      effects = TestBed.get(PracticeSessionsEffects);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(c|)', { c: completion });

      expect(effects.updatePracticeSession$).toBeObservable(expected);
    });
  });

  describe('redirectToListAfterCreate$', () => {
    it('should redirect to list on create success', () => {
      spyOn(router, 'navigate').and.callFake(() => true);
      const action = new PracticeSessionCreateSuccess({
        message: Constant.PracticeSessionCreateSuccess
      });

      actions$.stream = hot('-a|', { a: action });
      effects = TestBed.get(PracticeSessionsEffects);

      effects.redirectToListAfterCreate$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('redirectToListAfterDelete$', () => {
    it('should redirect to list on delete success', () => {
      spyOn(router, 'navigate').and.callFake(() => true);
      const action = new PracticeSessionDeleteSuccess({
        message: Constant.PracticeSessionDeleteSuccess
      });

      actions$.stream = hot('-a|', { a: action });
      effects = TestBed.get(PracticeSessionsEffects);

      effects.redirectToListAfterDelete$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('redirectToListAfterUpdate', () => {
    it('should redirect to list on update succes', () => {
      spyOn(router, 'navigate').and.callFake(() => true);
      const action = new PracticeSessionUpdateSuccess({
        message: Constant.PracticeSessionUpdateSuccess
      });

      actions$.stream = hot('-a|', { a: action });
      effects = TestBed.get(PracticeSessionsEffects);

      effects.redirectToListAfterUpdate$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledTimes(1);
      });
    });
  });
});
