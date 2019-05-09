import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FirebaseError } from 'firebase';
// app
import { AppState } from '../../app.reducer';
import { TabListLoad, TabListLoadFail, TabListLoadSuccess, TabsActionsTypes } from '../actions/tabs.actions';
import { TabsResource } from '../../../drums/shared/resources/tabs/tabs.resource';
import { Tab } from '../../../drums/shared/models/tab.model';

@Injectable()
export class TabsEffects {

  @Effect()
  loadTabList$: Observable<Action> = this.actions$
    .pipe(
      ofType<TabListLoad>(TabsActionsTypes.LoadList),
      switchMap(() => this.tabsResource.getTabList$()),
      map((tabList: Tab[]) => new TabListLoadSuccess({ tabList })),
      catchError((error: FirebaseError) => of(new TabListLoadFail({ error: error.message })))
    );

  constructor(private actions$: Actions,
              private store$: Store<AppState>,
              private tabsResource: TabsResource) {
  }
}
