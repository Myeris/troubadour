import {
  PracticeSessionDelete, PracticeSessionDeleteFail, PracticeSessionDeleteSuccess,
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

  describe('PracticeSessionDelete', () => {
    it('should create an action', () => {
      const action = new PracticeSessionDelete({id: 'id'});
      expect(action.type).toBe(PracticeSessionsActionsTypes.Delete);
    });
  });

  describe('PracticeSessionDeleteSuccess', () => {
    it('should create an action', () => {
      const action = new PracticeSessionDeleteSuccess();
      expect(action.type).toBe(PracticeSessionsActionsTypes.DeleteSuccess);
    });
  });

  describe('PracticeSessionDeleteFail', () => {
    it('should create an action', () => {
      const action = new PracticeSessionDeleteFail({error: 'error'});
      expect(action.type).toBe(PracticeSessionsActionsTypes.DeleteFail);
    });
  });
});
