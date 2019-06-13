import { createSelector } from '@ngrx/store';
// app
import { AppState } from '../../app.reducer';
import { userEntityAdapter, UserState } from '../user.state';
import { User } from '../../../auth/shared/models/user.model';

export const selectUser = (state: AppState) => state.user;

export const getUserState = createSelector(
  selectUser,
  state => state
);

export const { selectIds, selectAll, selectEntities, selectTotal } = userEntityAdapter.getSelectors(
  getUserState
);

export const isLoading = createSelector(
  getUserState,
  state => state.isLoading
);

export const isLoggedIn = createSelector(
  getUserState,
  state => state.isLoggedIn
);

export const getCurrentUser = createSelector(
  getUserState,
  state => (state.selectedId ? state.entities[state.selectedId] : null)
);

export const isVerified = createSelector(
  getCurrentUser,
  currentUser => (currentUser ? currentUser.verified : false)
);

export const verificationEmailSent = createSelector(
  getUserState,
  state => state.verificationEmailSent
);

export const canUseApp = createSelector(
  isLoggedIn,
  isVerified,
  (loggedIn: boolean, verified: boolean) => loggedIn && verified
);

export const getFeedback = createSelector(
  getUserState,
  state => state.feedback
);
