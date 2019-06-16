import { Action } from '@ngrx/store';
// app
import { Tag } from '../../../drums/shared/models/tag.model';

export enum TypesActionsTypes {
  LoadList = '[Practice session page] Load types list',
  LoadListSuccess = '[TypesResourceAPI] Load types list success',
  LoadListFail = '[TypesResourcesAPI] Load types list fail'
}

export class TypesListLoad implements Action {
  public readonly type = TypesActionsTypes.LoadList;
}

export class TypesListLoadSuccess implements Action {
  public readonly type = TypesActionsTypes.LoadListSuccess;

  constructor(public payload: { types: Tag[] }) {}
}

export class TypesListLoadFail implements Action {
  public readonly type = TypesActionsTypes.LoadListFail;

  constructor(public payload: { error: string }) {}
}

export type TypesActions = TypesListLoad | TypesListLoadSuccess | TypesListLoadFail;
