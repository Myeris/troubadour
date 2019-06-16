import {
  highscoresEntityAdapter,
  HighscoresState,
  initialHighscoresState
} from '../highscores.state';
import { HighscoresActions, HighscoresActionsTypes } from '../actions/highscores.actions';

export function highscoreReducer(
  state: HighscoresState = initialHighscoresState,
  action: HighscoresActions
) {
  switch (action.type) {
    case HighscoresActionsTypes.LoadList:
    case HighscoresActionsTypes.Save:
      return { ...state, isLoading: true, selectedId: null, feedback: null };
    case HighscoresActionsTypes.LoadListFail:
    case HighscoresActionsTypes.SaveFail:
      return {
        ...state,
        isLoading: false,
        selectedId: null,
        feedback: { success: false, message: action.payload.error }
      };
    case HighscoresActionsTypes.LoadListSuccess:
      return highscoresEntityAdapter.addAll(action.payload.highscores, {
        ...state,
        isLoading: false,
        feedback: null,
        selectedId: null
      });
    case HighscoresActionsTypes.Select:
      return { ...state, isLoading: false, selectedId: action.payload.id, feedback: null };
    case HighscoresActionsTypes.SaveSuccess:
      return {
        ...state,
        isLoading: false,
        selectedId: null,
        feedback: { success: true, message: action.payload.message }
      };
    default:
      return state;
  }
}
