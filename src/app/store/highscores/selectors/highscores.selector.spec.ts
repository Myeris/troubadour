import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
// app
import { Highscore } from '../../../drums/shared/models/highscore.model';
import { appReducers, AppState } from '../../app.reducer';
import { getError, getSelectedHighscore, isLoading, getFeedback } from './highscores.selector';
import {
  HighscoreListLoad,
  HighscoreListLoadFail,
  HighscoreListLodSuccess,
  HighscoreSelect
} from '../actions/highscores.actions';
import { Feedback } from 'src/app/shared/models/feedback.model';

const highscores: Highscore[] = [
  { $key: '1', name: 'Single stroke roll', highscore: 130, date: new Date().valueOf() },
  { $key: '2', name: 'Double stroke roll', highscore: 100, date: new Date().valueOf() },
  { $key: '3', name: 'Triple stroke roll', highscore: 80, date: new Date().valueOf() }
];

describe('HighscoresSelectors', () => {
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

      store.dispatch(new HighscoreListLoad());
      expect(result).toBeTruthy();

      store.dispatch(new HighscoreListLoadFail({ error: 'error' }));
      expect(result).toBeFalsy();

      store.dispatch(new HighscoreListLoad());
      expect(result).toBeTruthy();

      store.dispatch(new HighscoreListLodSuccess({ highscores: [] }));
      expect(result).toBeFalsy();
    });
  });

  describe('gegetFeedbackError', () => {
    it('should return the feedback message', () => {
      const error = 'error';
      const feedback: Feedback = { success: false, message: error };
      let result = null;

      store.select(getFeedback).subscribe(value => (result = value));

      expect(result).toBeNull();

      store.dispatch(new HighscoreListLoadFail({ error }));
      expect(result).toEqual(feedback);

      store.dispatch(new HighscoreListLoad());
      expect(result).toBeNull();

      store.dispatch(new HighscoreListLoadFail({ error }));
      expect(result).toEqual(feedback);

      store.dispatch(new HighscoreListLodSuccess({ highscores }));
      expect(result).toBeNull();
    });
  });

  describe('getSelectedHighscore', () => {
    it('should return the selected highscore', () => {
      const id = '1';
      let result = null;

      store.select(getSelectedHighscore).subscribe(value => (result = value));

      expect(result).toBeNull();

      store.dispatch(new HighscoreListLodSuccess({ highscores }));

      store.dispatch(new HighscoreSelect({ id }));
      expect(result).toEqual(highscores[0]);
    });
  });
});
