import {Action} from '@ngrx/store';
// app
import {PracticeSession} from '../../../drums/shared/models/practice-session.model';

export enum PracticeSessionsActionsTypes {
  LoadList = '[Practice session list page] Load list',
  LoadListSuccess = '[PracticeSessionsAPI] Load list success',
  LoadListFail = '[PracticeSessionsAPI] Load list fail',

  Delete = '[Practice session list page] Remove practice session',
  DeleteSuccess = '[PracticeSessionsAPI] Remove practice session success',
  DeleteFail = '[PracticeSessionsAPI] Remove practice session fail'
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

export class PracticeSessionDelete implements Action {
  public readonly type = PracticeSessionsActionsTypes.Delete;

  constructor(public payload: { id: string }) {
  }
}

export class PracticeSessionDeleteSuccess implements Action {
  public readonly type = PracticeSessionsActionsTypes.DeleteSuccess;
}

export class PracticeSessionDeleteFail implements Action {
  public readonly type = PracticeSessionsActionsTypes.DeleteFail;

  constructor(public payload: { error: string }) {
  }
}

export type PracticeSessionsActions =
  | PracticeSessionListLoad
  | PracticeSessionListLoadSuccess
  | PracticeSessionListLoadFail
  | PracticeSessionDelete
  | PracticeSessionDeleteSuccess
  | PracticeSessionDeleteFail;
