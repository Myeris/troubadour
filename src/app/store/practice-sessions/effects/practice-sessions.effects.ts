import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FirebaseError } from 'firebase';
// app
import { AppState } from '../../app.reducer';
import {
  PracticeSessionCreate,
  PracticeSessionCreateFail,
  PracticeSessionCreateSuccess,
  PracticeSessionDelete,
  PracticeSessionDeleteFail,
  PracticeSessionDeleteSuccess,
  PracticeSessionListLoad,
  PracticeSessionListLoadFail,
  PracticeSessionListLoadSuccess,
  PracticeSessionsActionsTypes,
  PracticeSessionOneLoad,
  PracticeSessionOneLoadFail,
  PracticeSessionOneLoadSuccess,
  PracticeSessionUpdate,
  PracticeSessionUpdateSuccess,
  PracticeSessionUpdateFail
} from '../actions/practice-sessions.actions';
import { getCurrentUser } from '../../user/selectors/user.selectors';
import { PracticeSessionsResource } from '../../../drums/shared/resources/practice-sessions/practice-sessions.resource';
import { PracticeSession } from '../../../drums/shared/models/practice-session.model';
import { Constant } from 'src/app/shared/utils/enums/constants.utils';

@Injectable()
export class PracticeSessionsEffects {
  @Effect()
  loadPracticeSessionList$: Observable<Action> = this.actions$.pipe(
    ofType<PracticeSessionListLoad>(PracticeSessionsActionsTypes.LoadList),
    withLatestFrom(this.store$.select(getCurrentUser)),
    switchMap(([action, currentUser]) =>
      this.practiceSessionResource.getSessionList$(currentUser.id)
    ),
    map(
      (sessionList: PracticeSession[]) =>
        new PracticeSessionListLoadSuccess({ practiceSessionList: sessionList })
    ),
    catchError((error: FirebaseError) =>
      of(new PracticeSessionListLoadFail({ error: error.message }))
    )
  );

  @Effect()
  loadOnePracticeSession$: Observable<Action> = this.actions$.pipe(
    ofType<PracticeSessionOneLoad>(PracticeSessionsActionsTypes.LoadOne),
    withLatestFrom(this.store$.select(getCurrentUser)),
    switchMap(([action, currentUser]) =>
      this.practiceSessionResource.getOneSession$(currentUser.id, action.payload.id)
    ),
    map(
      (practiceSession: PracticeSession) => new PracticeSessionOneLoadSuccess({ practiceSession })
    ),
    catchError((error: FirebaseError) =>
      of(new PracticeSessionOneLoadFail({ error: error.message }))
    )
  );

  @Effect()
  removePracticeSession$: Observable<Action> = this.actions$.pipe(
    ofType<PracticeSessionDelete>(PracticeSessionsActionsTypes.Delete),
    withLatestFrom(this.store$.select(getCurrentUser)),
    switchMap(([action, currentUser]) =>
      this.practiceSessionResource.removeSession(currentUser.id, action.payload.id)
    ),
    map(() => new PracticeSessionDeleteSuccess({ message: Constant.PracticeSessionDeleteSuccess })),
    catchError((error: FirebaseError) =>
      of(new PracticeSessionDeleteFail({ error: error.message }))
    )
  );

  @Effect()
  createPracticeSession$: Observable<Action> = this.actions$.pipe(
    ofType<PracticeSessionCreate>(PracticeSessionsActionsTypes.Create),
    withLatestFrom(this.store$.select(getCurrentUser)),
    switchMap(([action, currentUser]) =>
      this.practiceSessionResource.createSession(currentUser.id, action.payload.practiceSession)
    ),
    map(() => new PracticeSessionCreateSuccess({ message: Constant.PracticeSessionCreateSuccess })),
    catchError((error: FirebaseError) =>
      of(new PracticeSessionCreateFail({ error: error.message }))
    )
  );

  @Effect()
  updatePracticeSession$: Observable<Action> = this.actions$.pipe(
    ofType<PracticeSessionUpdate>(PracticeSessionsActionsTypes.UpdateSession),
    withLatestFrom(this.store$.select(getCurrentUser)),
    switchMap(([action, currentUser]) =>
      this.practiceSessionResource.updateSession(currentUser.id, action.payload.practiceSession)
    ),
    map(() => new PracticeSessionUpdateSuccess({ message: Constant.PracticeSessionUpdateSuccess })),
    catchError((error: FirebaseError) =>
      of(new PracticeSessionUpdateFail({ error: error.message }))
    )
  );

  @Effect({ dispatch: false })
  redirectToListAfterCreate$: Observable<Action> = this.actions$.pipe(
    ofType<PracticeSessionCreateSuccess>(PracticeSessionsActionsTypes.CreateSuccess),
    tap(() => this.router.navigate(['/practice-sessions']))
  );

  @Effect({ dispatch: false })
  redirectToListAfterDelete$: Observable<Action> = this.actions$.pipe(
    ofType<PracticeSessionDeleteSuccess>(PracticeSessionsActionsTypes.DeleteSuccess),
    tap(() => this.router.navigate(['/practice-sessions']))
  );

  @Effect({ dispatch: false })
  redirectToListAfterUpdate$: Observable<Action> = this.actions$.pipe(
    ofType<PracticeSessionUpdateSuccess>(PracticeSessionsActionsTypes.UpdateSessionSuccess),
    tap(() => this.router.navigate(['/practice-sessions']))
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private router: Router,
    private practiceSessionResource: PracticeSessionsResource
  ) {}
}
