import { createSelector } from '@ngrx/store';
// app
import { AppState } from '../../app.reducer';
import { highscoresEntityAdapter } from '../highscores.state';

export const selectHighscore = (state: AppState) => state.highscore;

export const getHighscoreState = createSelector(
  selectHighscore,
  state => state
);

export const {
  selectIds,
  selectAll,
  selectEntities,
  selectTotal
} = highscoresEntityAdapter.getSelectors(getHighscoreState);

export const isLoading = createSelector(
  getHighscoreState,
  state => state.isLoading
);

export const getError = createSelector(
  getHighscoreState,
  state => state.error
);

export const getSelectedHighscore = createSelector(
  getHighscoreState,
  state => state.selectedId ? state.entities[state.selectedId] : null
);
