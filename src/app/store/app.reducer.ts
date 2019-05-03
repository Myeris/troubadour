import {ActionReducerMap} from '@ngrx/store';
// app
import {UserState} from './user/user.state';
import {userReducer} from './user/reducers/user.reducer';

export interface AppState {
  user: UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  user: userReducer
};
