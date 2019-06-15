import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
// app
import { selectAll as selectAllSessions } from 'src/app/store/practice-sessions/selectors/practice-sessions.selector';
import { fadeAnimation } from '../../../../shared/animations/animations';
import { LifecycleComponent } from '../../../../shared/components/lifecycle/lifecycle.component';
import { AppState } from '../../../../store/app.reducer';
import {
  HighscoreSave,
  HighscoreSelect
} from '../../../../store/highscores/actions/highscores.actions';
import { getSelectedHighscore } from '../../../../store/highscores/selectors/highscores.selector';
import { TabSelect, TabListLoad } from '../../../../store/tabs/actions/tabs.actions';
import {
  getSelectedTab,
  selectAll as selectAllTabs
} from '../../../../store/tabs/selectors/tabs.selector';
import { Breadcrumb } from '../../../shared/models/breadcrumb.model';
import { Highscore } from '../../../shared/models/highscore.model';
import { PracticeSession } from '../../../shared/models/practice-session.model';
import { Tab } from '../../../shared/models/tab.model';
import { PracticeSessionListLoad } from 'src/app/store/practice-sessions/actions/practice-sessions.actions';

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
  private tabs$: Observable<Tab[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.tab$ = this.store.select(getSelectedTab).pipe(takeUntil(this.componentDestroyed$));
    this.tabs$ = this.store.select(selectAllTabs).pipe(takeUntil(this.componentDestroyed$));
    this.sessions$ = this.store.select(selectAllSessions).pipe(takeUntil(this.componentDestroyed$));
    this.highscore$ = this.store
      .select(getSelectedHighscore)
      .pipe(takeUntil(this.componentDestroyed$));

    this.sessions$.subscribe((sessions: PracticeSession[]) => {
      if (sessions.length === 0) {
        this.store.dispatch(new PracticeSessionListLoad());
      }
    });

    this.tabs$.subscribe((tabs: Tab[]) => {
      if (tabs.length === 0) {
        this.store.dispatch(new TabListLoad());
      }

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
    });
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
