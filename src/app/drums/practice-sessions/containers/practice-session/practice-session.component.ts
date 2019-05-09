import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
// app
import {LifecycleComponent} from '../../../../shared/components/lifecycle/lifecycle.component';
import {PracticeSession} from '../../../shared/models/practice-session.model';
import {Tab} from '../../../shared/models/tab.model';
import {Tag} from '../../../shared/models/tag.model';
import {AppState} from '../../../../store/app.reducer';
import {getSelectedPracticeSession, isLoading} from '../../../../store/practice-sessions/selectors/practice-sessions.selector';
import {
  PracticeSessionCreate,
  PracticeSessionDelete,
  PracticeSessionSelect
} from '../../../../store/practice-sessions/actions/practice-sessions.actions';
import {selectAll as selectAllTabs} from 'src/app/store/tabs/selectors/tabs.selector';
import {selectAll as selectAllTypes} from 'src/app/store/types/selectors/types.selector';
import {TabListLoad} from '../../../../store/tabs/actions/tabs.actions';
import {Breadcrumb} from '../../../shared/models/breadcrumb.model';
import {TypesListLoad} from '../../../../store/types/actions/types.actions';

@Component({
  selector: 'app-practice-session',
  templateUrl: './practice-session.component.html',
  styleUrls: ['./practice-session.component.scss']
})
export class PracticeSessionComponent extends LifecycleComponent implements OnInit {
  public session$: Observable<PracticeSession>;
  public tabs$: Observable<Tab[]>;
  public types$: Observable<Tag[]>;
  public isLoading$: Observable<boolean>;
  public exerciseId: string;
  public showForm = false;
  public feedback: { success: boolean, message: string };

  public get breadcrumb(): Breadcrumb {
    return {label: 'Practice sessions', route: 'practice-sessions', params: {}};
  }

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private router: Router) {
    super();
  }

  ngOnInit() {
    if (this.route.snapshot.url.length === 1) {
      this.showForm = this.route.snapshot.url.map((u) => u.path)[0] === 'new';
    }

    if (this.route.snapshot.url.length === 2) {
      this.showForm = this.route.snapshot.url.map((u) => u.path)[1] === 'edit';
    }

    this.session$ = this.store.select(getSelectedPracticeSession)
      .pipe(takeUntil(this.componentDestroyed$));
    this.tabs$ = this.store.select(selectAllTabs)
      .pipe(takeUntil(this.componentDestroyed$));
    this.types$ = this.store.select(selectAllTypes)
      .pipe(takeUntil(this.componentDestroyed$));
    this.isLoading$ = this.store.select(isLoading)
      .pipe(takeUntil(this.componentDestroyed$));

    this.route.queryParams
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((params: Params) => this.exerciseId = params.exercise);

    if (this.route.snapshot.params.id) {
      this.store.dispatch(new PracticeSessionSelect({id: this.route.snapshot.params.id}));
    }

    this.store.dispatch(new TabListLoad());
    this.store.dispatch(new TypesListLoad());
  }

  public onCreate(practiceSession: PracticeSession): void {
    this.store.dispatch(new PracticeSessionCreate({practiceSession}));
  }

  public async onUpdate(event: PracticeSession): Promise<void> {
    // const key = this.route.snapshot.params.id;
    //
    // try {
    //   await this.practiceSessionsService.updateSession(key, event);
    //   this.router.navigate([`practice-sessions/${key}`])
    // } catch (e) {
    //   this.sentryService.captureException(e);
    //   this.feedback.success = false;
    //   this.feedback.message = e;
    // }
  }

  public onRemove(): void {
    const id = this.route.snapshot.params.id;
    this.store.dispatch(new PracticeSessionDelete({id}));
  }

  private backToPracticeSessions(): void {
    this.router.navigate(['practice-sessions']);
  }
}
