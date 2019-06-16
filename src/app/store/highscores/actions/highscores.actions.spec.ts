import {
  HighscoreListLoad,
  HighscoreListLodSuccess,
  HighscoresActionsTypes,
  HighscoreSave,
  HighscoreSaveFail,
  HighscoreSaveSuccess,
  HighscoreSelect
} from './highscores.actions';
import { Highscore } from '../../../drums/shared/models/highscore.model';

describe('HighscoresActions', () => {
  describe('HighscoreListLoad', () => {
    it('should create an action', () => {
      const action = new HighscoreListLoad();
      expect(action.type).toBe(HighscoresActionsTypes.LoadList);
    });
  });

  describe('HighscoreListLodSuccess', () => {
    it('should create an action', () => {
      const action = new HighscoreListLodSuccess({ highscores: [] });
      expect(action.type).toBe(HighscoresActionsTypes.LoadListSuccess);
    });
  });

  describe('HighscoreSelect', () => {
    it('should create an action', () => {
      const action = new HighscoreSelect({ id: 'id' });
      expect(action.type).toBe(HighscoresActionsTypes.Select);
    });
  });

  describe('HighscoreSave', () => {
    it('should create an action', () => {
      const action = new HighscoreSave({ highscore: {} as Highscore });
      expect(action.type).toBe(HighscoresActionsTypes.Save);
    });
  });

  describe('HighscoreSaveSuccess', () => {
    it('should create an action', () => {
      const action = new HighscoreSaveSuccess({ message: 'message' });
      expect(action.type).toBe(HighscoresActionsTypes.SaveSuccess);
    });
  });

  describe('HighscoreSaveFail', () => {
    it('should create an action', () => {
      const action = new HighscoreSaveFail({ error: 'error' });
      expect(action.type).toBe(HighscoresActionsTypes.SaveFail);
    });
  });
});
