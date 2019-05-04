import {createSelector} from '@ngrx/store';
// app
import {AppState} from '../../app.reducer';
import {practiceSessionsEntityAdapter} from '../practice-sessions.state';

export const seletPracticeSession = (state: AppState) => state.practiceSession;

export const getPracticeSessionState = createSelector(
  seletPracticeSession,
  state => state
);

export const {
  selectIds,
  selectAll,
  selectEntities,
  selectTotal
} = practiceSessionsEntityAdapter.getSelectors(getPracticeSessionState);

export const isLoading = createSelector(
  getPracticeSessionState,
  state => state.isLoading
);

export const getError = createSelector(
  getPracticeSessionState,
  state => state.error
);
