import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Store, StoreModule } from '@ngrx/store';
// app
import { PracticeSessionsComponent } from './practice-sessions.component';
import { appReducers, AppState } from '../../../../store/app.reducer';
import { SearchPipe } from '../../../shared/pipes/search/search.pipe';
import { PracticeSession } from '../../../shared/models/practice-session.model';
import { PracticeSessionDelete } from '../../../../store/practice-sessions/actions/practice-sessions.actions';

describe('PracticeSessionsComponent', () => {
  let component: PracticeSessionsComponent;
  let fixture: ComponentFixture<PracticeSessionsComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    const bed = TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        NgxPaginationModule,
        StoreModule.forRoot({ ...appReducers })
      ],
      declarations: [PracticeSessionsComponent, SearchPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = bed.createComponent(PracticeSessionsComponent);
    component = fixture.componentInstance;
    store = bed.get(Store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onRemove', () => {
    it('should dispatch an event', () => {
      spyOn(store, 'dispatch').and.callFake(() => {
      });

      component.onRemove({ $key: 'a' } as PracticeSession);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new PracticeSessionDelete({ id: 'a' }));
    });
  });
});
