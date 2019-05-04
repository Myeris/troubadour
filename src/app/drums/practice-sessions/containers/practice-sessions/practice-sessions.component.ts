import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';
// app
import {PracticeSession} from '../../../shared/models/models/practice-session.model';
import {AppState} from '../../../../store/app.reducer';
import {selectAll} from 'src/app/store/practice-sessions/selectors/practice-sessions.selector';
import {LifecycleComponent} from '../../../../shared/components/lifecycle/lifecycle.component';
import {PracticeSessionListLoad} from '../../../../store/practice-sessions/actions/practice-sessions.actions';

@Component({
  selector: 'app-practice-sessions',
  templateUrl: './practice-sessions.component.html',
  styleUrls: ['./practice-sessions.component.scss']
})
export class PracticeSessionsComponent extends LifecycleComponent implements OnInit {
  public sessionList$: Observable<PracticeSession[]>;

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.sessionList$ = this.store.select(selectAll)
      .pipe(takeUntil(this.componentDestroyed$));

    this.store.dispatch(new PracticeSessionListLoad());
  }

}
