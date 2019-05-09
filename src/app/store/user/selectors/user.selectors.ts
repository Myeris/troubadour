import { createSelector } from '@ngrx/store';
// app
import { AppState } from '../../app.reducer';
import { userEntityAdapter } from '../user.state';

export const selectUser = (state: AppState) => state.user;

export const getUserState = createSelector(
  selectUser,
  state => state
);

export const {
  selectIds,
  selectAll,
  selectEntities,
  selectTotal
} = userEntityAdapter.getSelectors(getUserState);

export const isLoading = createSelector(
  getUserState,
  state => state.isLoading
);

export const isLoggedIn = createSelector(
  getUserState,
  state => state.isLoggedIn
);

export const getError = createSelector(
  getUserState,
  state => state.error
);

export const getCurrentUser = createSelector(
  getUserState,
  state => state.selectedId ? state.entities[state.selectedId] : null
);
