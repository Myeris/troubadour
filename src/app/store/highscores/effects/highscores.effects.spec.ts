import { Store } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { FirebaseError } from 'firebase';
// app
import { cold, hot } from 'jasmine-marbles';
import { getActions, TestActions } from '../../../shared/utils/test-actions/test-actions.utils';
import { HighscoresEffects } from './highscores.effects';
import { AppState } from '../../app.reducer';
import { HighscoresResource } from '../../../drums/shared/resources/highscores/highscores.resource';
import { Highscore } from '../../../drums/shared/models/highscore.model';
import {
  HighscoreListLoad,
  HighscoreListLoadFail,
  HighscoreListLodSuccess,
  HighscoreSave,
  HighscoreSaveFail,
  HighscoreSaveSuccess
} from '../actions/highscores.actions';
import { User } from '../../../auth/shared/models/user.model';
import SpyObj = jasmine.SpyObj;

const highscores: Highscore[] = [
  { $key: '1', name: 'Single stroke roll', highscore: 130, date: new Date().valueOf() },
  { $key: '2', name: 'Double stroke roll', highscore: 100, date: new Date().valueOf() },
  { $key: '3', name: 'Triple stroke roll', highscore: 80, date: new Date().valueOf() }
];

const user: User = {
  email: 'email',
  id: '123',
  verified: true,
  authenticated: true
};

class HighscoresResourceMock {
  getHighscoreList$() {}

  saveHighscore() {}
}

describe('HighscoresEffects', () => {
  let actions$: TestActions;
  let effects: HighscoresEffects;
  let resource: HighscoresResource;
  let store: SpyObj<Store<AppState>>;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        HighscoresEffects,
        { provide: Actions, useFactory: getActions },
        { provide: Store, useValue: jasmine.createSpyObj('store', ['select']) },
        { provide: HighscoresResource, useClass: HighscoresResourceMock }
      ]
    });

    store = bed.get(Store);
    actions$ = bed.get(Actions);
    resource = bed.get(HighscoresResource);
  });

  it('should be created', () => {
    effects = TestBed.get(HighscoresEffects);
    expect(effects).toBeTruthy();
  });

  describe('loadHighscoreList$', () => {
    it('should return a list of highscores', () => {
      spyOn(resource, 'getHighscoreList$').and.returnValue(of(highscores));

      const action = new HighscoreListLoad();
      const completion = new HighscoreListLodSuccess({ highscores });

      store.select.and.returnValue(cold('r', { r: user }));

      effects = TestBed.get(HighscoresEffects);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadHighscoreList$).toBeObservable(expected);
    });

    it('should retun an error message', () => {
      const error: FirebaseError = { message: 'error' } as FirebaseError;
      spyOn(resource, 'getHighscoreList$').and.returnValue(throwError(error));

      const action = new HighscoreListLoad();
      const completion = new HighscoreListLoadFail({ error: error.message });

      store.select.and.returnValue(cold('r', { r: user })); // Initializing the mock

      effects = TestBed.get(HighscoresEffects); // Instantiate effects here so they can use the mock

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(c|)', { c: completion });

      expect(effects.loadHighscoreList$).toBeObservable(expected);
    });
  });

  describe('saveHighscore$', () => {
    it('should return a success action', () => {
      spyOn(resource, 'saveHighscore').and.returnValue(of({}));

      const action = new HighscoreSave({ highscore: {} as Highscore });
      const completion = new HighscoreSaveSuccess();

      store.select.and.returnValue(cold('r', { r: user }));

      effects = TestBed.get(HighscoresEffects);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.saveHighscore$).toBeObservable(expected);
    });

    it('should throw an error', () => {
      const error: FirebaseError = { message: 'error' } as FirebaseError;
      spyOn(resource, 'saveHighscore').and.returnValue(throwError(error));

      const action = new HighscoreSave({ highscore: {} as Highscore });
      const completion = new HighscoreSaveFail({ error: error.message });

      store.select.and.returnValue(cold('r', { r: user })); // Initializing the mock

      effects = TestBed.get(HighscoresEffects); // Instantiate effects here so they can use the mock

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(c|)', { c: completion });

      expect(effects.saveHighscore$).toBeObservable(expected);
    });
  });
});
