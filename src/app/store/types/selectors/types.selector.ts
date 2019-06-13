import { createSelector } from '@ngrx/store';
// app
import { AppState } from '../../app.reducer';
import { typesEntityAdapter } from '../types.state';
import { getTabState } from '../../tabs/selectors/tabs.selector';

export const selectType = (state: AppState) => state.type;

export const getTypeState = createSelector(
  selectType,
  state => state
);

export const {
  selectIds,
  selectAll,
  selectEntities,
  selectTotal
} = typesEntityAdapter.getSelectors(getTypeState);

export const isLoading = createSelector(
  getTypeState,
  state => state.isLoading
);

export const getFeedback = createSelector(
  getTabState,
  state => state.feedback
);
