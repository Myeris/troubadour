import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
// app
import {LifecycleComponent} from '../../../../shared/components/lifecycle/lifecycle.component';
import {PracticeSession} from '../../../shared/models/practice-session.model';
import {Tab} from '../../../shared/models/tab.model';
import {Tag} from '../../../shared/models/tag.model';
import {AppState} from '../../../../store/app.reducer';
import {getSelectedPracticeSession} from '../../../../store/practice-sessions/selectors/practice-sessions.selector';
import {PracticeSessionSelect} from '../../../../store/practice-sessions/actions/practice-sessions.actions';

@Component({
  selector: 'app-practice-session',
  templateUrl: './practice-session.component.html',
  styleUrls: ['./practice-session.component.scss']
})
export class PracticeSessionComponent extends LifecycleComponent implements OnInit {
  public session$: Observable<PracticeSession>;
  public tabs$: Observable<Tab[]>;
  public types$: Observable<Tag[]>;
  public exerciseId: string;
  public showForm = false;
  public breadcrumb: { label: string, route: string[] } = {
    label: 'Practice sessions',
    route: ['/practice-sessions']
  };
  public feedback: { success: boolean, message: string };

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.exerciseId = this.route.snapshot.params.id;
    this.session$ = this.store.select(getSelectedPracticeSession)
      .pipe(takeUntil(this.componentDestroyed$));

    this.store.dispatch(new PracticeSessionSelect({id: this.exerciseId}));
  }

  public async onCreate(event: PracticeSession): Promise<void> {
    // try {
    //   await this.practiceSessionsService.addSession(event);
    //   this.backToPracticeSessions();
    // } catch (e) {
    //   this.sentryService.captureException(e);
    //   this.feedback.success = false;
    //   this.feedback.message = e;
    // }
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

  public async onRemove(event: PracticeSession): Promise<void> {
    // const key = this.route.snapshot.params.id;
    //
    // try {
    //   await this.practiceSessionsService.removeSession(key);
    //   this.backToPracticeSessions();
    // } catch (e) {
    //   this.sentryService.captureException(e);
    //   this.feedback.success = false;
    //   this.feedback.message = e;
    // }
  }

  private backToPracticeSessions(): void {
    // this.router.navigate(['practice-sessions']);
  }
}
