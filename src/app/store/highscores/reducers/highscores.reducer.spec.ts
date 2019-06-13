import { Highscore } from '../../../drums/shared/models/highscore.model';
import { initialHighscoresState } from '../highscores.state';
import { highscoreReducer } from './highscores.reducer';
import {
  HighscoreListLoad,
  HighscoreListLoadFail,
  HighscoreListLodSuccess,
  HighscoreSave,
  HighscoreSaveFail,
  HighscoreSaveSuccess,
  HighscoreSelect
} from '../actions/highscores.actions';
import { Constant } from 'src/app/shared/utils/enums/constants.utils';

const highscores: Highscore[] = [
  { $key: '1', name: 'Single stroke roll', highscore: 130, date: new Date().valueOf() },
  { $key: '2', name: 'Double stroke roll', highscore: 100, date: new Date().valueOf() },
  { $key: '3', name: 'Triple stroke roll', highscore: 80, date: new Date().valueOf() }
];

describe('HighscoreReducer', () => {
  describe('undefined actions', () => {
    it('should return the default state', () => {
      const initialState = initialHighscoresState;
      const action = {};
      // @ts-ignore because I'm trying to fool the reducer by passing non sense but TS keeps crying
      const state = highscoreReducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('LoadList', () => {
    it('should set the state', () => {
      const action = new HighscoreListLoad();
      const state = highscoreReducer(initialHighscoresState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.feedback).toBeNull();
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(0);
    });
  });

  describe('LoadListFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new HighscoreListLoadFail({ error });
      const state = highscoreReducer(initialHighscoresState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.feedback.message).toBe(error);
      expect(state.feedback.success).toBeFalsy();
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(0);
    });
  });

  describe('LoadListSuccess', () => {
    it('should set the state', () => {
      const action = new HighscoreListLodSuccess({ highscores });
      const state = highscoreReducer(initialHighscoresState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.feedback).toBeNull();
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(3);
    });
  });

  describe('Select', () => {
    it('should set the state', () => {
      const action = new HighscoreSelect({ id: 'id' });
      const state = highscoreReducer(initialHighscoresState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.feedback).toBeNull();
      expect(state.selectedId).toBe('id');
    });
  });

  describe('Save', () => {
    it('should set the state', () => {
      const action = new HighscoreSave({ highscore: {} as Highscore });
      const state = highscoreReducer(initialHighscoresState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.feedback).toBeNull();
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(0);
    });
  });

  describe('SaveFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new HighscoreSaveFail({ error });
      const state = highscoreReducer(initialHighscoresState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.feedback.message).toBe(error);
      expect(state.feedback.success).toBeFalsy();
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(0);
    });
  });

  describe('SaveSuccess', () => {
    it('should set the state', () => {
      const action = new HighscoreSaveSuccess({ message: Constant.HighscoreSaveSuccess });
      const state = highscoreReducer(initialHighscoresState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.feedback.success).toBeTruthy();
      expect(state.feedback.message).toBe(Constant.HighscoreSaveSuccess);
      expect(state.selectedId).toBeNull();
    });
  });
});
