import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
// app
import { PracticeSession } from '../../../shared/models/practice-session.model';
import { AppState } from '../../../../store/app.reducer';
import { selectAll } from 'src/app/store/practice-sessions/selectors/practice-sessions.selector';
import { LifecycleComponent } from '../../../../shared/components/lifecycle/lifecycle.component';
import {
  PracticeSessionDelete,
  PracticeSessionListLoad
} from '../../../../store/practice-sessions/actions/practice-sessions.actions';
import { Pagination } from '../../../shared/models/pagination.model';
import { fadeAnimation } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-practice-sessions',
  templateUrl: './practice-sessions.component.html',
  styleUrls: ['./practice-sessions.component.scss'],
  animations: [fadeAnimation]
})
export class PracticeSessionsComponent extends LifecycleComponent implements OnInit {
  public sessionList$: Observable<PracticeSession[]>;
  public pagination: Pagination = { current: 1, itemsPerPage: 10 };
  public searchText: '';

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.sessionList$ = this.store.select(selectAll).pipe(takeUntil(this.componentDestroyed$));

    this.store.dispatch(new PracticeSessionListLoad());
  }

  public onRemove(practiceSession: PracticeSession): void {
    this.store.dispatch(new PracticeSessionDelete({ id: practiceSession.$key }));
  }
}
