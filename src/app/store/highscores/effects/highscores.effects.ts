import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { FirebaseError } from 'firebase';
// app
import {
  HighscoreListLoad,
  HighscoreListLoadFail,
  HighscoreListLodSuccess,
  HighscoresActionsTypes,
  HighscoreSave,
  HighscoreSaveFail,
  HighscoreSaveSuccess
} from '../actions/highscores.actions';
import { HighscoresResource } from '../../../drums/shared/resources/highscores/highscores.resource';
import { AppState } from '../../app.reducer';
import { getCurrentUser } from '../../user/selectors/user.selectors';
import { Highscore } from '../../../drums/shared/models/highscore.model';

@Injectable()
export class HighscoresEffects {
  @Effect()
  loadHighscoreList$: Observable<Action> = this.actions$.pipe(
    ofType<HighscoreListLoad>(HighscoresActionsTypes.LoadList),
    withLatestFrom(this.store$.select(getCurrentUser)),
    switchMap(([action, currentUser]) => this.highscoresResource.getHighscoreList$(currentUser.id)),
    map((highscores: Highscore[]) => new HighscoreListLodSuccess({ highscores })),
    catchError((error: FirebaseError) => of(new HighscoreListLoadFail({ error: error.message })))
  );

  @Effect()
  saveHighscore$: Observable<Action> = this.actions$.pipe(
    ofType<HighscoreSave>(HighscoresActionsTypes.Save),
    withLatestFrom(this.store$.select(getCurrentUser)),
    switchMap(([action, currentUser]) =>
      this.highscoresResource.saveHighscore(currentUser.id, action.payload.highscore)
    ),
    map(() => new HighscoreSaveSuccess()),
    catchError((error: FirebaseError) => of(new HighscoreSaveFail({ error: error.message })))
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private highscoresResource: HighscoresResource
  ) {}
}
