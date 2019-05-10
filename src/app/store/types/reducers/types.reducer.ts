import { initialTypesState, typesEntityAdapter, TypesState } from '../types.state';
import { TypesActions, TypesActionsTypes } from '../actions/types.actions';

export function typesReducer(
  state: TypesState = initialTypesState,
  action: TypesActions
) {
  switch (action.type) {
    case TypesActionsTypes.LoadList:
      return { ...state, isLoading: true, error: null };
    case TypesActionsTypes.LoadListSuccess:
      return typesEntityAdapter.addAll(action.payload.types, {
        ...state,
        isLoading: false,
        error: null
      });
    case TypesActionsTypes.LoadListFail:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
}