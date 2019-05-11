import { initialUserState, userEntityAdapter, UserState } from '../user.state';
import { UserActions, UserActionsTypes } from '../actions/user.actions';

export function userReducer(
  state: UserState = initialUserState,
  action: UserActions
): UserState {
  switch (action.type) {
    case UserActionsTypes.LogIn:
    case UserActionsTypes.Register:
    case UserActionsTypes.ChangePassword:
      return { ...state, isLoggedIn: false, isLoading: true, error: null, selectedId: null };
    case UserActionsTypes.LogInFail:
    case UserActionsTypes.RegisterFail:
    case UserActionsTypes.ChangePasswordFail:
      return { ...state, isLoggedIn: false, isLoading: false, error: action.payload.error, selectedId: null };
    case UserActionsTypes.LogInSuccess:
    case UserActionsTypes.RegisterSuccess:
      return userEntityAdapter.addOne(action.payload.user, {
        ...state,
        selectedId: action.payload.user.id,
        isLoggedIn: true,
        isLoading: false,
        error: null
      });
    case UserActionsTypes.LogOutSuccess:
      return userEntityAdapter.removeAll({ ...state, isLoggedIn: false, isLoading: false, selectedId: null, error: null });
    case UserActionsTypes.ChangePasswordSuccess:
      return { ...state, isLoggedIn: false, isLoading: false, error: null, selectedId: null };
    default:
      return state;
  }
}
