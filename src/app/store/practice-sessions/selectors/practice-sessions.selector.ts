import { createSelector } from '@ngrx/store';
// app
import { AppState } from '../../app.reducer';
import { practiceSessionsEntityAdapter } from '../practice-sessions.state';

export const selectPracticeSession = (state: AppState) => state.practiceSession;

export const getPracticeSessionState = createSelector(
  selectPracticeSession,
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

export const getSelectedPracticeSession = createSelector(
  getPracticeSessionState,
  state => state.entities[state.selectedId]
);

export const getFeedback = createSelector(
  getPracticeSessionState,
  state => state.feedback
);
