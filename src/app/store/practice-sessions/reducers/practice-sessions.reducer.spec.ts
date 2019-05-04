import {initialPracticeSessionState} from '../practice-sessions.state';
import {practiceSessionsReducer} from './practice-sessions.reducer';
import {PracticeSessionListLoad, PracticeSessionListLoadFail, PracticeSessionListLoadSuccess} from '../actions/practice-sessions.actions';
import {PracticeSession} from '../../../drums/shared/models/practice-session.model';

describe('PracticeSessionsReducer', () => {
  describe('undefined actions', () => {
    it('should return the default state', () => {
      const initialState = initialPracticeSessionState;
      const action = {};
      // @ts-ignore because I'm trying to fool the reducer by passing non sense but TS keeps crying
      const state = practiceSessionsReducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('LoadList', () => {
    it('should set the state', () => {
      const action = new PracticeSessionListLoad();
      const state = practiceSessionsReducer(initialPracticeSessionState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(0);
    });
  });

  describe('LoadListFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new PracticeSessionListLoadFail({error});
      const state = practiceSessionsReducer(initialPracticeSessionState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBe(error);
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(0);
    });
  });

  describe('LoadListSuccess', () => {
    it('should set the state', () => {
      const sessions: PracticeSession[] = [
        {$key: 'id'} as PracticeSession
      ];
      const action = new PracticeSessionListLoadSuccess({practiceSessionList: sessions});
      const state = practiceSessionsReducer(initialPracticeSessionState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(1);
    });
  });
});
