import {ActionReducerMap} from '@ngrx/store';
// app
import {UserState} from './user/user.state';

export interface AppState {
  user: UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  user: null
};
