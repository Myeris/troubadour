import {initialTabsState, tabsEntityAdapter, TabsState} from '../tabs.state';
import {TabsActions, TabsActionsTypes} from '../actions/tabs.actions';

export function tabsReducer(
  state: TabsState = initialTabsState,
  action: TabsActions
) {
  switch (action.type) {
    case TabsActionsTypes.LoadList:
      return {...state, isLoading: true, error: null};
    case TabsActionsTypes.LoadListSuccess:
      return tabsEntityAdapter.addAll(action.payload.tabList, {
        ...state,
        isLoading: false,
        error: null
      });
    case TabsActionsTypes.LoadListFail:
      return {...state, isLoading: false, error: action.payload.error};
    default:
      return state;
  }
}
