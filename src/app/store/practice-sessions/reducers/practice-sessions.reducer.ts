import { initialPracticeSessionState, practiceSessionsEntityAdapter, PracticeSessionsState } from '../practice-sessions.state';
import { PracticeSessionsActions, PracticeSessionsActionsTypes } from '../actions/practice-sessions.actions';

export function practiceSessionsReducer(
  state: PracticeSessionsState = initialPracticeSessionState,
  action: PracticeSessionsActions
) {
  switch (action.type) {
    case PracticeSessionsActionsTypes.LoadList:
    case PracticeSessionsActionsTypes.Create:
      return { ...state, isLoading: true, selectedId: null, error: null };
    case PracticeSessionsActionsTypes.LoadListFail:
    case PracticeSessionsActionsTypes.DeleteFail:
    case PracticeSessionsActionsTypes.CreateFail:
      return { ...state, isLoading: false, selectedId: null, error: action.payload.error };
    case PracticeSessionsActionsTypes.LoadListSuccess:
      return practiceSessionsEntityAdapter.addAll(action.payload.practiceSessionList, {
        ...state,
        isLoading: false,
        selectedId: null,
        error: null
      });
    case PracticeSessionsActionsTypes.Delete:
      return { ...state, isLoading: true, selectedId: action.payload.id, error: null };
    case PracticeSessionsActionsTypes.DeleteSuccess:
      return practiceSessionsEntityAdapter.removeOne(state.selectedId, {
        ...state,
        isLoading: false,
        selectedId: null,
        error: null
      });
    case PracticeSessionsActionsTypes.CreateSuccess:
      return { ...state, isLoading: false, selectedId: null, error: null };
    case PracticeSessionsActionsTypes.Select:
      return { ...state, isLoading: false, selectedId: action.payload.id, error: null };
    default:
      return state;
  }
}
