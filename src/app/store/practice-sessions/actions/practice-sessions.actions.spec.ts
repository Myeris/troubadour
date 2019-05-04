import {
  PracticeSessionListLoad,
  PracticeSessionListLoadFail,
  PracticeSessionListLoadSuccess,
  PracticeSessionsActionsTypes
} from './practice-sessions.actions';

describe('PracticeSessionsActions', () => {
  describe('PracticeSessionListLoad', () => {
    it('should create an action', () => {
      const action = new PracticeSessionListLoad();
      expect(action.type).toBe(PracticeSessionsActionsTypes.LoadList);
    });
  });

  describe('PracticeSessionListLoadSuccess', () => {
    it('should create an action', () => {
      const action = new PracticeSessionListLoadSuccess({practiceSessionList: []});
      expect(action.type).toBe(PracticeSessionsActionsTypes.LoadListSuccess);
    });
  });

  describe('PracticeSessionListLoadFail', () => {
    it('should create an action', () => {
      const action = new PracticeSessionListLoadFail({error: 'error'});
      expect(action.type).toBe(PracticeSessionsActionsTypes.LoadListFail);
    });
  });
});
