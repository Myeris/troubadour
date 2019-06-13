import { initialUserState, userEntityAdapter, UserState } from '../user.state';
import { UserActions, UserActionsTypes } from '../actions/user.actions';

export function userReducer(state: UserState = initialUserState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionsTypes.LogIn:
    case UserActionsTypes.Register:
    case UserActionsTypes.ChangePassword:
    case UserActionsTypes.ResetPassword:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: true,
        error: null,
        selectedId: null,
        verificationEmailSent: false,
        feedback: null
      };
    case UserActionsTypes.LogInFail:
    case UserActionsTypes.RegisterFail:
    case UserActionsTypes.ChangePasswordFail:
    case UserActionsTypes.ResetPasswordFail:
    case UserActionsTypes.SendVerificationEmailFail:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        error: action.payload.error,
        selectedId: null,
        verificationEmailSent: false,
        feedback: { success: false, message: action.payload.error }
      };
    case UserActionsTypes.LogInSuccess:
    case UserActionsTypes.RegisterSuccess:
    case UserActionsTypes.SetPersistedUser:
      return userEntityAdapter.addOne(action.payload.user, {
        ...state,
        selectedId: action.payload.user.id,
        isLoggedIn: true,
        isLoading: false,
        error: null,
        verificationEmailSent: false,
        feedback: null
      });
    case UserActionsTypes.LogOutSuccess:
      return userEntityAdapter.removeAll({
        ...state,
        isLoggedIn: false,
        isLoading: false,
        selectedId: null,
        error: null,
        verificationEmailSent: false,
        feedback: null
      });
    case UserActionsTypes.ChangePasswordSuccess:
    case UserActionsTypes.ResetPasswordSuccess:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: state.isLoading,
        error: null,
        selectedId: null,
        verificationEmailSent: false,
        feedback: null
      };
    case UserActionsTypes.SendVerificationEmail:
      return {
        ...state,
        isLoading: false,
        error: null,
        selectedId: null,
        verificationEmailSent: false,
        feedback: null
      };
    case UserActionsTypes.SendVerificationEmailSuccess:
      return {
        ...state,
        isLoading: false,
        error: null,
        selectedId: null,
        verificationEmailSent: true,
        feedback: { success: true, message: action.payload.success }
      };
    default:
      return state;
  }
}
