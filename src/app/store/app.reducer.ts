import { ActionReducerMap } from '@ngrx/store';
// app
import { UserState } from './user/user.state';
import { userReducer } from './user/reducers/user.reducer';
import { PracticeSessionsState } from './practice-sessions/practice-sessions.state';
import { practiceSessionsReducer } from './practice-sessions/reducers/practice-sessions.reducer';
import { TabsState } from './tabs/tabs.state';
import { tabsReducer } from './tabs/reducers/tabs.reducer';
import { TypesState } from './types/types.state';
import { typesReducer } from './types/reducers/types.reducer';
import { HighscoresState } from './highscores/highscores.state';
import { highscoreReducer } from './highscores/reducers/highscores.reducer';

export interface AppState {
  user: UserState;
  practiceSession: PracticeSessionsState;
  tab: TabsState;
  type: TypesState;
  highscore: HighscoresState;
}

export const appReducers: ActionReducerMap<AppState> = {
  user: userReducer,
  practiceSession: practiceSessionsReducer,
  tab: tabsReducer,
  type: typesReducer,
  highscore: highscoreReducer
};
