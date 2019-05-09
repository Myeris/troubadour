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
  PracticeSessionsActionsTypes,
  PracticeSessionSelect
} from './practice-sessions.actions';
import {PracticeSession} from '../../../drums/shared/models/practice-session.model';

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

  describe('PracticeSessionSelect', () => {
    it('should create an action', () => {
      const action = new PracticeSessionSelect({id: 'id'});
      expect(action.type).toBe(PracticeSessionsActionsTypes.Select);
    });
  });

  describe('PracticeSessionCreate', () => {
    it('should create an action', () => {
      const action = new PracticeSessionCreate({practiceSession: {} as PracticeSession});
      expect(action.type).toBe(PracticeSessionsActionsTypes.Create);
    });
  });

  describe('PracticeSessionCreateSuccess', () => {
    it('should create an action', () => {
      const action = new PracticeSessionCreateSuccess();
      expect(action.type).toBe(PracticeSessionsActionsTypes.CreateSuccess);
    });
  });

  describe('PracticeSessionCreateFail', () => {
    it('should create an action', () => {
      const action = new PracticeSessionCreateFail({error: 'error'});
      expect(action.type).toBe(PracticeSessionsActionsTypes.CreateFail);
    });
  });
});
