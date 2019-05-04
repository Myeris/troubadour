import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {FirebaseError} from 'firebase';
// app
import {AppState} from '../../app.reducer';
import {
  PracticeSessionDelete, PracticeSessionDeleteFail, PracticeSessionDeleteSuccess,
  PracticeSessionListLoad,
  PracticeSessionListLoadFail,
  PracticeSessionListLoadSuccess,
  PracticeSessionsActionsTypes
} from '../actions/practice-sessions.actions';
import {getCurrentUser} from '../../user/selectors/user.selectors';
import {PracticeSessionsResource} from '../../../drums/shared/resources/practice-sessions/practice-sessions.resource';
import {PracticeSession} from '../../../drums/shared/models/practice-session.model';

@Injectable()
export class PracticeSessionsEffects {
  @Effect()
  loadPracticeSessionList$: Observable<Action> = this.actions$
    .pipe(
      ofType<PracticeSessionListLoad>(PracticeSessionsActionsTypes.LoadList),
      withLatestFrom(this.store$.select(getCurrentUser)),
      switchMap(([action, currentUser]) => this.practiceSessionResource.getSessionList$(currentUser.id)),
      map((sessionList: PracticeSession[]) => new PracticeSessionListLoadSuccess({practiceSessionList: sessionList})),
      catchError((error: FirebaseError) => of(new PracticeSessionListLoadFail({error: error.message})))
    );

  @Effect()
  removePracticeSession$: Observable<Action> = this.actions$
    .pipe(
      ofType<PracticeSessionDelete>(PracticeSessionsActionsTypes.Delete),
      withLatestFrom(this.store$.select(getCurrentUser)),
      switchMap(([action, currentUser]) => this.practiceSessionResource.removeSession(currentUser.id, action.payload.id)),
      map(() => new PracticeSessionDeleteSuccess()),
      catchError((error: FirebaseError) => of(new PracticeSessionDeleteFail({error: error.message})))
    );

  constructor(private actions$: Actions,
              private store$: Store<AppState>,
              private practiceSessionResource: PracticeSessionsResource) {
  }
}
