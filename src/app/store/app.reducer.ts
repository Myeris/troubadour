import {ActionReducerMap} from '@ngrx/store';
// app
import {UserState} from './user/user.state';
import {userReducer} from './user/reducers/user.reducer';
import {PracticeSessionsState} from './practice-sessions/practice-sessions.state';
import {practiceSessionsReducer} from './practice-sessions/reducers/practice-sessions.reducer';

export interface AppState {
  user: UserState;
  practiceSession: PracticeSessionsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  user: userReducer,
  practiceSession: practiceSessionsReducer
};
