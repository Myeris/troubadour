import { initialTabsState, tabsEntityAdapter, TabsState } from '../tabs.state';
import { TabsActions, TabsActionsTypes } from '../actions/tabs.actions';

export function tabsReducer(
  state: TabsState = initialTabsState,
  action: TabsActions
) {
  switch (action.type) {
    case TabsActionsTypes.LoadList:
      return { ...state, isLoading: true, error: null, selectedId: null };
    case TabsActionsTypes.LoadListSuccess:
      return tabsEntityAdapter.addAll(action.payload.tabList, {
        ...state,
        isLoading: false,
        error: null,
        selectedId: null
      });
    case TabsActionsTypes.LoadListFail:
      return { ...state, isLoading: false, error: action.payload.error, selectedId: null };
    case TabsActionsTypes.Select:
      return { ...state, isLoading: false, error: null, selectedId: action.payload.id };
    case TabsActionsTypes.SelectType:
      return { ...state, isLoading: false, error: null, selectedId: null, selectedType: action.payload.type };
    default:
      return state;
  }
}
