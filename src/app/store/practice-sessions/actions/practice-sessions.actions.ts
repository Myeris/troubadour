import { Action } from '@ngrx/store';
// app
import { PracticeSession } from '../../../drums/shared/models/practice-session.model';

export enum PracticeSessionsActionsTypes {
  LoadList = '[Practice session list page] Load list',
  LoadListSuccess = '[PracticeSessionsAPI] Load list success',
  LoadListFail = '[PracticeSessionsAPI] Load list fail',

  LoadOne = '[Practice session item page] Load one',
  LoadOneSuccess = '[Practice session item page] Load one success',
  LoadOneFail = '[Practice session item page] Load one fail',

  Delete = '[Practice session list page] Remove practice session',
  DeleteSuccess = '[PracticeSessionsAPI] Remove practice session success',
  DeleteFail = '[PracticeSessionsAPI] Remove practice session fail',

  UpdateSession = '[Practice session item page] Update practice session',
  UpdateSessionSuccess = '[Practice session item page] Update practice session success',
  UpdateSessionFail = '[Practice session item page] Update pratice session fail',

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

  constructor(public payload: { practiceSessionList: PracticeSession[] }) {}
}

export class PracticeSessionListLoadFail implements Action {
  public readonly type = PracticeSessionsActionsTypes.LoadListFail;

  constructor(public payload: { error: string }) {}
}

export class PracticeSessionCreate implements Action {
  public readonly type = PracticeSessionsActionsTypes.Create;

  constructor(public payload: { practiceSession: PracticeSession }) {}
}

export class PracticeSessionCreateSuccess implements Action {
  public readonly type = PracticeSessionsActionsTypes.CreateSuccess;

  constructor(public payload: { message: string }) {}
}

export class PracticeSessionCreateFail implements Action {
  public readonly type = PracticeSessionsActionsTypes.CreateFail;

  constructor(public payload: { error: string }) {}
}

export class PracticeSessionDelete implements Action {
  public readonly type = PracticeSessionsActionsTypes.Delete;

  constructor(public payload: { id: string }) {}
}

export class PracticeSessionDeleteSuccess implements Action {
  public readonly type = PracticeSessionsActionsTypes.DeleteSuccess;

  constructor(public payload: { message: string }) {}
}

export class PracticeSessionDeleteFail implements Action {
  public readonly type = PracticeSessionsActionsTypes.DeleteFail;

  constructor(public payload: { error: string }) {}
}

export class PracticeSessionSelect implements Action {
  public readonly type = PracticeSessionsActionsTypes.Select;

  constructor(public payload: { id: string }) {}
}

export class PracticeSessionOneLoad implements Action {
  public readonly type = PracticeSessionsActionsTypes.LoadOne;

  constructor(public payload: { id: string }) {}
}

export class PracticeSessionOneLoadSuccess implements Action {
  public readonly type = PracticeSessionsActionsTypes.LoadOneSuccess;

  constructor(public payload: { practiceSession: PracticeSession }) {}
}

export class PracticeSessionOneLoadFail implements Action {
  public readonly type = PracticeSessionsActionsTypes.LoadOneFail;

  constructor(public payload: { error: string }) {}
}

export class PracticeSessionUpdate implements Action {
  public readonly type = PracticeSessionsActionsTypes.UpdateSession;

  constructor(public payload: { practiceSession: PracticeSession }) {}
}

export class PracticeSessionUpdateSuccess implements Action {
  public readonly type = PracticeSessionsActionsTypes.UpdateSessionSuccess;

  constructor(public payload: { message: string }) {}
}

export class PracticeSessionUpdateFail implements Action {
  public readonly type = PracticeSessionsActionsTypes.UpdateSessionFail;

  constructor(public payload: { error: string }) {}
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
  | PracticeSessionCreateFail
  | PracticeSessionOneLoad
  | PracticeSessionOneLoadSuccess
  | PracticeSessionOneLoadFail
  | PracticeSessionUpdate
  | PracticeSessionUpdateSuccess
  | PracticeSessionUpdateFail;
