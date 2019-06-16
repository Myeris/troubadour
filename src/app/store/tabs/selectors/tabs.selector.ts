import { createSelector } from '@ngrx/store';
// app
import { AppState } from '../../app.reducer';
import { tabsEntityAdapter } from '../tabs.state';
import { Tab } from '../../../drums/shared/models/tab.model';

export const selectTab = (state: AppState) => state.tab;

export const getTabState = createSelector(
  selectTab,
  state => state
);

export const { selectIds, selectAll, selectEntities, selectTotal } = tabsEntityAdapter.getSelectors(
  getTabState
);

export const isLoading = createSelector(
  getTabState,
  state => state.isLoading
);

export const getFeedback = createSelector(
  getTabState,
  state => state.feedback
);

export const getSelectedTab = createSelector(
  getTabState,
  state => (state.selectedId ? state.entities[state.selectedId] : null)
);

export const getTabsBySelectedType = createSelector(
  getTabState,
  state => {
    if (state.ids.length === 0) {
      return null;
    }

    // @ts-ignore
    const tabs: Tab[] = state.ids.map(i => state.entities[i]);

    return state.selectedType ? tabs.filter((tab: Tab) => tab.type === state.selectedType) : tabs;
  }
);
