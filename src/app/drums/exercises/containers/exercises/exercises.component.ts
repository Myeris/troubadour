import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
// app
import { LifecycleComponent } from '../../../../shared/components/lifecycle/lifecycle.component';
import { Tag } from '../../../shared/models/tag.model';
import { PracticeSession } from '../../../shared/models/practice-session.model';
import { Tab } from '../../../shared/models/tab.model';
import { Pagination } from '../../../shared/models/pagination.model';
import { AppState } from '../../../../store/app.reducer';
import { selectAll as selectAllTypes } from 'src/app/store/types/selectors/types.selector';
import { getTabsBySelectedType } from 'src/app/store/tabs/selectors/tabs.selector';
import { selectAll as selectAllSessions } from 'src/app/store/practice-sessions/selectors/practice-sessions.selector';
import { TypesListLoad } from '../../../../store/types/actions/types.actions';
import { TabListLoad, TabSelectType } from '../../../../store/tabs/actions/tabs.actions';
import { PracticeSessionListLoad } from '../../../../store/practice-sessions/actions/practice-sessions.actions';
import { fadeAnimation } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  animations: [fadeAnimation]
})
export class ExercisesComponent extends LifecycleComponent implements OnInit {
  public searchText = '';
  public types$: Observable<Tag[]>;
  public filteredTabs$: Observable<Tab[]>;
  public sessions$: Observable<PracticeSession[]>;
  public activeFilter: Tag;
  public pagination: Pagination = { current: 1, itemsPerPage: 10 };

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.types$ = this.store.select(selectAllTypes).pipe(takeUntil(this.componentDestroyed$));
    this.filteredTabs$ = this.store
      .select(getTabsBySelectedType)
      .pipe(takeUntil(this.componentDestroyed$));
    this.sessions$ = this.store.select(selectAllSessions).pipe(takeUntil(this.componentDestroyed$));

    this.store.dispatch(new TypesListLoad());
    this.store.dispatch(new TabListLoad());
    this.store.dispatch(new PracticeSessionListLoad());
  }

  public filter(type: Tag): void {
    this.activeFilter = type;
    this.store.dispatch(new TabSelectType({ type: type ? type.$key : null }));
  }
}
