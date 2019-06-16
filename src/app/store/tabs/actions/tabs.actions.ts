import { Action } from '@ngrx/store';
// app
import { Tab } from '../../../drums/shared/models/tab.model';

export enum TabsActionsTypes {
  LoadList = '[AppComponent] Load tab list',
  LoadListSuccess = '[TabsResourceAPI] Load tab list success',
  LoadListFail = '[TabsResourceAPI] Load tab list fail',

  Select = '[Exercise page] Select a tab',
  SelectType = '[Exercise list page] Select a type'
}

export class TabListLoad implements Action {
  public readonly type = TabsActionsTypes.LoadList;
}

export class TabListLoadSuccess implements Action {
  public readonly type = TabsActionsTypes.LoadListSuccess;

  constructor(public payload: { tabList: Tab[] }) {}
}

export class TabListLoadFail implements Action {
  public readonly type = TabsActionsTypes.LoadListFail;

  constructor(public payload: { error: string }) {}
}

export class TabSelect implements Action {
  public readonly type = TabsActionsTypes.Select;

  constructor(public payload: { id: string }) {}
}

export class TabSelectType implements Action {
  public readonly type = TabsActionsTypes.SelectType;

  constructor(public payload: { type: string }) {}
}

export type TabsActions =
  | TabListLoad
  | TabListLoadSuccess
  | TabListLoadFail
  | TabSelect
  | TabSelectType;
