import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, takeUntil } from 'rxjs/operators';
// app
import { Breadcrumb } from '../../../shared/models/breadcrumb.model';
import { Tab } from '../../../shared/models/tab.model';
import { Highscore } from '../../../shared/models/highscore.model';
import { PracticeSession } from '../../../shared/models/practice-session.model';
import { AppState } from '../../../../store/app.reducer';
import { LifecycleComponent } from '../../../../shared/components/lifecycle/lifecycle.component';
import { getSelectedTab } from '../../../../store/tabs/selectors/tabs.selector';
import { TabSelect } from '../../../../store/tabs/actions/tabs.actions';
import { selectAll } from 'src/app/store/practice-sessions/selectors/practice-sessions.selector';
import { getSelectedHighscore } from '../../../../store/highscores/selectors/highscores.selector';
import {
  HighscoreSave,
  HighscoreSelect
} from '../../../../store/highscores/actions/highscores.actions';
import { fadeAnimation } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  animations: [fadeAnimation]
})
export class ExerciseComponent extends LifecycleComponent implements OnInit {
  public tab$: Observable<Tab>;
  public highscore$: Observable<Highscore>;
  public sessions$: Observable<PracticeSession[]>;
  public assignOpen = false;
  public breadcrumb: Breadcrumb = {
    label: 'Library',
    route: '/exercises',
    params: {}
  };
  private exerciseId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.tab$ = this.store.select(getSelectedTab).pipe(takeUntil(this.componentDestroyed$));
    this.sessions$ = this.store.select(selectAll).pipe(takeUntil(this.componentDestroyed$));
    this.highscore$ = this.store
      .select(getSelectedHighscore)
      .pipe(takeUntil(this.componentDestroyed$));

    this.route.params
      .pipe(
        takeUntil(this.componentDestroyed$),
        map((params: Params) => {
          this.exerciseId = params.id;
          this.store.dispatch(new TabSelect({ id: this.exerciseId }));
          this.store.dispatch(new HighscoreSelect({ id: this.exerciseId }));
        })
      )
      .subscribe();
  }

  public saveHighscore(highscore: Highscore): void {
    this.store.dispatch(new HighscoreSave({ highscore }));
  }

  public assignExercise(): void {
    window.scrollTo(0, 0);
    this.assignOpen = true;
  }

  public onAssign(session: PracticeSession): void {
    let params = ['practice-sessions', 'new'];

    if (session) {
      params = ['practice-sessions', session.$key, 'edit'];
    }

    this.router.navigate(params, { queryParams: { exercise: this.exerciseId } });
  }

  public onAssignCancel(): void {
    this.assignOpen = false;
  }
}
