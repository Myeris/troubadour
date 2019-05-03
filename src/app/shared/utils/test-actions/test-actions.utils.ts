import {Actions} from '@ngrx/effects';
import {Observable, EMPTY} from 'rxjs';

export class TestActions extends Actions {
  public source;

  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions(): TestActions {
  return new TestActions();
}
