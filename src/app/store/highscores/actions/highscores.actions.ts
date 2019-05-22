import { Action } from '@ngrx/store';
// app
import { Highscore } from '../../../drums/shared/models/highscore.model';

export enum HighscoresActionsTypes {
  LoadList = '[Exercise page] Load highscore list',
  LoadListSuccess = '[HighscoreResourceAPI] Load highscore list success',
  LoadListFail = '[HighscoreResourceAPI] Load highscore list fail',

  Select = '[Exercise page] Select highscore',

  Save = '[Exercise page] Save highscore',
  SaveSuccess = '[HighscoreResourceAPI] Save highscore success',
  SaveFail = '[HighscoreResourceAPI] Save highscore fail'
}

export class HighscoreListLoad implements Action {
  public readonly type = HighscoresActionsTypes.LoadList;
}

export class HighscoreListLodSuccess implements Action {
  public readonly type = HighscoresActionsTypes.LoadListSuccess;

  constructor(public payload: { highscores: Highscore[] }) {
  }
}

export class HighscoreListLoadFail implements Action {
  public readonly type = HighscoresActionsTypes.LoadListFail;

  constructor(public payload: { error: string }) {
  }
}

export class HighscoreSelect implements Action {
  public readonly type = HighscoresActionsTypes.Select;

  constructor(public payload: { id: string }) {
  }
}

export class HighscoreSave implements Action {
  public readonly type = HighscoresActionsTypes.Save;

  constructor(public payload: { highscore: Highscore }) {
  }
}

export class HighscoreSaveSuccess implements Action {
  public readonly type = HighscoresActionsTypes.SaveSuccess;
}

export class HighscoreSaveFail implements Action {
  public readonly type = HighscoresActionsTypes.SaveFail;

  constructor(public payload: { error: string }) {
  }
}

export type HighscoresActions =
  | HighscoreListLoad
  | HighscoreListLodSuccess
  | HighscoreListLoadFail
  | HighscoreSelect
  | HighscoreSave
  | HighscoreSaveSuccess
  | HighscoreSaveFail;
