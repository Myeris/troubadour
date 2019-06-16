import {
  initialPracticeSessionState,
  practiceSessionsEntityAdapter,
  PracticeSessionsState
} from '../practice-sessions.state';
import {
  PracticeSessionsActions,
  PracticeSessionsActionsTypes,
  PracticeSessionUpdate
} from '../actions/practice-sessions.actions';

export function practiceSessionsReducer(
  state: PracticeSessionsState = initialPracticeSessionState,
  action: PracticeSessionsActions
) {
  switch (action.type) {
    case PracticeSessionsActionsTypes.LoadList:
    case PracticeSessionsActionsTypes.Create:
    case PracticeSessionsActionsTypes.LoadOne:
      return { ...state, isLoading: true, selectedId: null, feedback: null };
    case PracticeSessionsActionsTypes.LoadListFail:
    case PracticeSessionsActionsTypes.DeleteFail:
    case PracticeSessionsActionsTypes.CreateFail:
    case PracticeSessionsActionsTypes.LoadOneFail:
    case PracticeSessionsActionsTypes.UpdateSessionFail:
      return {
        ...state,
        isLoading: false,
        selectedId: null,
        feedback: { success: false, message: action.payload.error }
      };
    case PracticeSessionsActionsTypes.LoadListSuccess:
      return practiceSessionsEntityAdapter.addAll(action.payload.practiceSessionList, {
        ...state,
        isLoading: false,
        selectedId: null,
        feedback: null
      });
    case PracticeSessionsActionsTypes.LoadOneSuccess:
      return practiceSessionsEntityAdapter.updateOne(
        {
          id: action.payload.practiceSession.$key,
          changes: { ...action.payload.practiceSession }
        },
        {
          ...state,
          isLoading: false,
          selectedId: action.payload.practiceSession.$key,
          feedback: null
        }
      );
    case PracticeSessionsActionsTypes.Delete:
      return { ...state, isLoading: true, selectedId: action.payload.id, feedback: null };
    case PracticeSessionsActionsTypes.DeleteSuccess:
      return practiceSessionsEntityAdapter.removeOne(state.selectedId, {
        ...state,
        isLoading: false,
        selectedId: null,
        feedback: { success: true, message: action.payload.message }
      });
    case PracticeSessionsActionsTypes.UpdateSessionSuccess:
    case PracticeSessionsActionsTypes.CreateSuccess:
      return {
        ...state,
        isLoading: false,
        selectedId: null,
        feedback: { success: true, message: action.payload.message }
      };
    case PracticeSessionsActionsTypes.Select:
      return { ...state, isLoading: false, selectedId: action.payload.id, feedback: null };
    case PracticeSessionsActionsTypes.UpdateSession:
      return practiceSessionsEntityAdapter.updateOne(
        { id: action.payload.practiceSession.$key, changes: action.payload.practiceSession },
        { ...state, isLoading: true, feedback: null }
      );
    default:
      return state;
  }
}
