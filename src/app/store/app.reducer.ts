import {ActionReducerMap} from '@ngrx/store';
// app
import {UserState} from './user/user.state';
import {userReducer} from './user/reducers/user.reducer';
import {PracticeSessionsState} from './practice-sessions/practice-sessions.state';
import {practiceSessionsReducer} from './practice-sessions/reducers/practice-sessions.reducer';
import {TabsState} from './tabs/tabs.state';
import {tabsReducer} from './tabs/reducers/tabs.reducer';

export interface AppState {
  user: UserState;
  practiceSession: PracticeSessionsState;
  tab: TabsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  user: userReducer,
  practiceSession: practiceSessionsReducer,
  tab: tabsReducer
};
