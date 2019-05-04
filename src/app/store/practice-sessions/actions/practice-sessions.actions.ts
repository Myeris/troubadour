import {Action} from '@ngrx/store';
// app
import {PracticeSession} from '../../../drums/shared/models/models/practice-session.model';

export enum PracticeSessionsActionsTypes {
  LoadList = '[Practice session page] Load list',
  LoadListSuccess = '[PracticeSessionAPI] Load list success',
  LoadListFail = '[PracticeSessionAPI] Load list fail'
}

export class PracticeSessionListLoad implements Action {
  public readonly type = PracticeSessionsActionsTypes.LoadList;
}

export class PracticeSessionListLoadSuccess implements Action {
  public readonly type = PracticeSessionsActionsTypes.LoadListSuccess;

  constructor(public payload: { practiceSessionList: PracticeSession[] }) {
  }
}

export class PracticeSessionListLoadFail implements Action {
  public readonly type = PracticeSessionsActionsTypes.LoadListFail;

  constructor(public payload: { error: string }) {
  }
}

export type PracticeSessionsActions =
  | PracticeSessionListLoad
  | PracticeSessionListLoadSuccess
  | PracticeSessionListLoadFail;
