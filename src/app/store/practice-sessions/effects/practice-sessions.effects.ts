import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {FirebaseError} from 'firebase';
// app
import {AppState} from '../../app.reducer';
import {
  PracticeSessionCreate, PracticeSessionCreateFail, PracticeSessionCreateSuccess,
  PracticeSessionDelete, PracticeSessionDeleteFail, PracticeSessionDeleteSuccess,
  PracticeSessionListLoad,
  PracticeSessionListLoadFail,
  PracticeSessionListLoadSuccess,
  PracticeSessionsActionsTypes
} from '../actions/practice-sessions.actions';
import {getCurrentUser} from '../../user/selectors/user.selectors';
import {PracticeSessionsResource} from '../../../drums/shared/resources/practice-sessions/practice-sessions.resource';
import {PracticeSession} from '../../../drums/shared/models/practice-session.model';
import {Router} from '@angular/router';

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

  @Effect()
  createPracticeSession$: Observable<Action> = this.actions$
    .pipe(
      ofType<PracticeSessionCreate>(PracticeSessionsActionsTypes.Create),
      withLatestFrom(this.store$.select(getCurrentUser)),
      switchMap(([action, currentUser]) => this.practiceSessionResource.createSession(currentUser.id, action.payload.practiceSession)),
      map(() => new PracticeSessionCreateSuccess()),
      catchError((error: FirebaseError) => of(new PracticeSessionCreateFail({error: error.message})))
    );

  @Effect({dispatch: false})
  redirectToList$: Observable<Action> = this.actions$
    .pipe(
      ofType<PracticeSessionCreateSuccess | PracticeSessionDeleteSuccess>(
        PracticeSessionsActionsTypes.CreateSuccess || PracticeSessionsActionsTypes.DeleteSuccess
      ),
      tap(() => this.router.navigate(['/practice-sessions']))
    );

  constructor(private actions$: Actions,
              private store$: Store<AppState>,
              private router: Router,
              private practiceSessionResource: PracticeSessionsResource) {
  }
}
