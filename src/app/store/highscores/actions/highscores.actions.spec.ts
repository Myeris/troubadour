import { HighscoreListLoad, HighscoreListLodSuccess, HighscoresActionsTypes, HighscoreSelect } from './highscores.actions';

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
});
