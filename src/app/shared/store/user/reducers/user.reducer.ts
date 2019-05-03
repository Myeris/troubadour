import {initialUserState, UserState} from '../user.state';
import {UserActions, UserActionsTypes} from '../actions/user.actions';

export function userReducer(
  state: UserState = initialUserState,
  action: UserActions
): UserState {
  switch (action.type) {
    case UserActionsTypes.LogIn:
      return {...state, isLoggedIn: false, isLoading: true, error: null};
    case UserActionsTypes.LogInFail:
      return {...state, isLoggedIn: false, isLoading: false, error: action.payload.error};
    case UserActionsTypes.LogInSuccess:
      return {...state, isLoggedIn: true, isLoading: false, error: null};
    default:
      return state;
  }
}
