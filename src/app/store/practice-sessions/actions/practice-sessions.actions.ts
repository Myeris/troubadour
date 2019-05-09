import { Action } from '@ngrx/store';
// app
import { PracticeSession } from '../../../drums/shared/models/practice-session.model';

export enum PracticeSessionsActionsTypes {
  LoadList = '[Practice session list page] Load list',
  LoadListSuccess = '[PracticeSessionsAPI] Load list success',
  LoadListFail = '[PracticeSessionsAPI] Load list fail',

  Delete = '[Practice session list page] Remove practice session',
  DeleteSuccess = '[PracticeSessionsAPI] Remove practice session success',
  DeleteFail = '[PracticeSessionsAPI] Remove practice session fail',

  Create = '[Practice session form] Create a practice session',
  CreateSuccess = '[PracticeSessionsAPI] Create a practice session success',
  CreateFail = '[PracticeSessionsAPI] Create a practice session fail',

  Select = '[Practice session item page] Select a practice session'
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

export class PracticeSessionCreate implements Action {
  public readonly type = PracticeSessionsActionsTypes.Create;

  constructor(public payload: { practiceSession: PracticeSession }) {
  }
}

export class PracticeSessionCreateSuccess implements Action {
  public readonly type = PracticeSessionsActionsTypes.CreateSuccess;
}

export class PracticeSessionCreateFail implements Action {
  public readonly type = PracticeSessionsActionsTypes.CreateFail;

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

export class PracticeSessionSelect implements Action {
  public readonly type = PracticeSessionsActionsTypes.Select;

  constructor(public payload: { id: string }) {
  }
}

export type PracticeSessionsActions =
  | PracticeSessionListLoad
  | PracticeSessionListLoadSuccess
  | PracticeSessionListLoadFail
  | PracticeSessionDelete
  | PracticeSessionDeleteSuccess
  | PracticeSessionDeleteFail
  | PracticeSessionSelect
  | PracticeSessionCreate
  | PracticeSessionCreateSuccess
  | PracticeSessionCreateFail;
