import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// app
import { PracticeSessionComponent } from './practice-session.component';
import { appReducers, AppState } from '../../../../store/app.reducer';
import { getSelectedPracticeSession, isLoading } from '../../../../store/practice-sessions/selectors/practice-sessions.selector';
import { selectAll as selectAllTabs } from 'src/app/store/tabs/selectors/tabs.selector';
import { selectAll as selectAllTypes } from 'src/app/store/types/selectors/types.selector';
import { TabListLoad } from '../../../../store/tabs/actions/tabs.actions';
import { TypesListLoad } from '../../../../store/types/actions/types.actions';
import {
  PracticeSessionCreate,
  PracticeSessionDelete,
  PracticeSessionSelect
} from '../../../../store/practice-sessions/actions/practice-sessions.actions';
import { PracticeSession } from '../../../shared/models/practice-session.model';

const session: PracticeSession = {
  name: 'Single beat combination',
  exercises: [],
  repeat: 1,
  created: new Date().valueOf(),
  updated: new Date().valueOf(),
  shared: false,
  drumkit: false,
  $key: 'a',
  $exist: () => true
};

describe('PracticeSessionComponent', () => {
  let component: PracticeSessionComponent;
  let router: Router;
  let fixture: ComponentFixture<PracticeSessionComponent>;
  let route: ActivatedRoute;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeSessionComponent],
      imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot(appReducers),
        RouterTestingModule.withRoutes([{
          path: 'practice-sessions', component: class BlankComponent {
          }
        }])
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            url: [{ path: 'new' }, { path: 'edit' }],
            params: { id: '1' }
          },
          queryParams: of({
            params: { exercise: 'wjehr' }
          })
        }
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSessionComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    route = TestBed.get(ActivatedRoute);
    store = TestBed.get(Store);
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.returnValue(of({}));
    spyOn(store, 'select').and.returnValue(of({}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('breadcrumbs', () => {
    it('should return the breadcrums', () => {
      expect(component.breadcrumb).toEqual({ label: 'Practice sessions', route: 'practice-sessions', params: {} });
    });
  });

  describe('ngOnInit', () => {
    it('should show form if route is new', () => {
      route.snapshot.url = [{ path: 'new' } as UrlSegment];

      component.ngOnInit();
      expect(component.showForm).toBeTruthy();
    });

    it('should show form if route is edit', () => {
      component.ngOnInit();
      expect(component.showForm).toBeTruthy();
    });

    it('should select and dispatch from store', () => {
      component.ngOnInit();
      expect(store.select).toHaveBeenCalledTimes(4);
      expect(store.select).toHaveBeenCalledWith(getSelectedPracticeSession);
      expect(store.select).toHaveBeenCalledWith(selectAllTabs);
      expect(store.select).toHaveBeenCalledWith(selectAllTypes);
      expect(store.select).toHaveBeenCalledWith(isLoading);

      expect(store.dispatch).toHaveBeenCalledTimes(3);
      expect(store.dispatch).toHaveBeenCalledWith(new TabListLoad());
      expect(store.dispatch).toHaveBeenCalledWith(new TypesListLoad());
      expect(store.dispatch).toHaveBeenCalledWith(new PracticeSessionSelect({ id: '1' }));
    });
  });

  describe('onCreate', () => {
    it('should dispatch an action', () => {
      component.onCreate(session);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new PracticeSessionCreate({ practiceSession: session }));
    });
  });

  describe('onUpdate', () => {
    it('should dispatch an event', () => {
      // TODO
    });
  });

  describe('onRemove', () => {
    it('should dispatch an event', () => {
      component.onRemove();
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new PracticeSessionDelete({ id: '1' }));
    });
  });

  describe('backToPracticeSessions', () => {
    it('should call router', () => {
      spyOn(router, 'navigate').and.callFake(() => true);
      (component as any).backToPracticeSessions();
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['practice-sessions']);
    });
  });
});
