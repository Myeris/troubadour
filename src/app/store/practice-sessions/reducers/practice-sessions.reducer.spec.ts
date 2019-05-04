import {initialPracticeSessionState} from '../practice-sessions.state';
import {practiceSessionsReducer} from './practice-sessions.reducer';
import {
  PracticeSessionDelete,
  PracticeSessionDeleteFail, PracticeSessionDeleteSuccess,
  PracticeSessionListLoad,
  PracticeSessionListLoadFail,
  PracticeSessionListLoadSuccess
} from '../actions/practice-sessions.actions';
import {PracticeSession} from '../../../drums/shared/models/practice-session.model';

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

  describe('Delete', () => {
    it('should set the state', () => {
      const id = 'id';
      const action = new PracticeSessionDelete({id});
      const state = practiceSessionsReducer(initialPracticeSessionState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
      expect(state.selectedId).toBe(id);
    });
  });

  describe('DeleteSuccess', () => {
    it('should set the state', () => {
      const selectedId = 'b';
      const action = new PracticeSessionDeleteSuccess();
      const entities = {
        a: sessions[0],
        b: sessions[1]
      };
      const ids = ['a', 'b'];
      const state = practiceSessionsReducer({...initialPracticeSessionState, entities, ids, selectedId}, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(1);
    });
  });

  describe('DeleteFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new PracticeSessionDeleteFail({error});
      const state = practiceSessionsReducer(initialPracticeSessionState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBe(error);
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(0);
    });
  });
});
