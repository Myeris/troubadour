import { initialPracticeSessionState } from '../practice-sessions.state';
import { practiceSessionsReducer } from './practice-sessions.reducer';
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
  PracticeSessionSelect,
  PracticeSessionUpdate,
  PracticeSessionUpdateSuccess,
  PracticeSessionUpdateFail
} from '../actions/practice-sessions.actions';
import { PracticeSession } from '../../../drums/shared/models/practice-session.model';
import { Constant } from 'src/app/shared/utils/enums/constants.utils';

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
      expect(state.feedback).toBeNull();
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(0);
    });
  });

  describe('LoadListFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new PracticeSessionListLoadFail({ error });
      const state = practiceSessionsReducer(initialPracticeSessionState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(0);
      expect(state.feedback.success).toBeFalsy();
      expect(state.feedback.message).toBe(error);
    });
  });

  describe('LoadListSuccess', () => {
    it('should set the state', () => {
      const action = new PracticeSessionListLoadSuccess({ practiceSessionList: sessions });
      const state = practiceSessionsReducer(initialPracticeSessionState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.feedback).toBeNull();
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(3);
    });
  });

  describe('Delete', () => {
    it('should set the state', () => {
      const id = 'id';
      const action = new PracticeSessionDelete({ id });
      const state = practiceSessionsReducer(initialPracticeSessionState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.feedback).toBeNull();
      expect(state.selectedId).toBe(id);
    });
  });

  describe('DeleteSuccess', () => {
    it('should set the state', () => {
      const selectedId = 'b';
      const action = new PracticeSessionDeleteSuccess({ message: 'message' });
      const entities = {
        a: sessions[0],
        b: sessions[1]
      };
      const ids = ['a', 'b'];
      const state = practiceSessionsReducer(
        { ...initialPracticeSessionState, entities, ids, selectedId },
        action
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(1);
      expect(state.feedback.success).toBeTruthy();
      expect(state.feedback.message).toBe('message');
    });
  });

  describe('DeleteFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new PracticeSessionDeleteFail({ error });
      const state = practiceSessionsReducer(initialPracticeSessionState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(0);
      expect(state.feedback.success).toBeFalsy();
      expect(state.feedback.message).toBe(error);
    });
  });

  describe('Select', () => {
    it('should set the state', () => {
      const action = new PracticeSessionSelect({ id: 'id' });
      const state = practiceSessionsReducer(initialPracticeSessionState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.feedback).toBeNull();
      expect(state.selectedId).toBe('id');
    });
  });

  describe('Create', () => {
    it('should set the state', () => {
      const action = new PracticeSessionCreate({ practiceSession: {} as PracticeSession });
      const state = practiceSessionsReducer(initialPracticeSessionState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.feedback).toBeNull();
      expect(state.selectedId).toBeNull();
    });
  });

  describe('CreateFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new PracticeSessionCreateFail({ error });
      const state = practiceSessionsReducer(initialPracticeSessionState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.selectedId).toBeNull();
      expect(state.ids.length).toBe(0);
      expect(state.feedback.success).toBeFalsy();
      expect(state.feedback.message).toBe(error);
    });
  });

  describe('CreateSuccess', () => {
    it('should set the state', () => {
      const action = new PracticeSessionCreateSuccess({ message: 'message' });
      const state = practiceSessionsReducer(initialPracticeSessionState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.selectedId).toBeNull();
      expect(state.feedback.success).toBeTruthy();
      expect(state.feedback.message).toBe('message');
    });
  });

  describe('Update', () => {
    it('should set the state', () => {
      const entities = {
        a: sessions[0],
        b: sessions[1]
      };
      const name = 'The new name';
      const practiceSession = { ...entities.a, name };
      const ids = ['a', 'b'];

      const action = new PracticeSessionUpdate({ practiceSession });
      const selectedId = null;
      const state = practiceSessionsReducer(
        { ...initialPracticeSessionState, entities, ids, selectedId },
        action
      );

      expect(state.isLoading).toBeTruthy();
      expect(state.feedback).toBeNull();
      expect(state.entities.a.name).toBe(name);
    });
  });

  describe('UpdateSuccess', () => {
    it('should set the state', () => {
      const action = new PracticeSessionUpdateSuccess({
        message: Constant.PracticeSessionUpdateSuccess
      });
      const state = practiceSessionsReducer(initialPracticeSessionState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.selectedId).toBeNull();
      expect(state.feedback.success).toBeTruthy();
      expect(state.feedback.message).toBe(Constant.PracticeSessionUpdateSuccess);
    });
  });

  describe('UpdateFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new PracticeSessionUpdateFail({ error });
      const state = practiceSessionsReducer(initialPracticeSessionState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.selectedId).toBeNull();
      expect(state.feedback.success).toBeFalsy();
      expect(state.feedback.message).toBe(error);
    });
  });
});
