import {createSelector} from '@ngrx/store';
// app
import {AppState} from '../../app.reducer';
import {tabsEntityAdapter} from '../tabs.state';

export const selectTab = (state: AppState) => state.tab;

export const getTabState = createSelector(
  selectTab,
  state => state
);

export const {
  selectIds,
  selectAll,
  selectEntities,
  selectTotal
} = tabsEntityAdapter.getSelectors(getTabState);

export const isLoading = createSelector(
  getTabState,
  state => state.isLoading
);

export const getError = createSelector(
  getTabState,
  state => state.error
);
