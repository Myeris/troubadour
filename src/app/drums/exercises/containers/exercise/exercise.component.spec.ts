import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// app
import { ExerciseComponent } from './exercise.component';
import { Tab } from '../../../shared/models/tab.model';
import { Highscore } from '../../../shared/models/highscore.model';
import { PracticeSession } from '../../../shared/models/practice-session.model';
import { SharedModule } from '../../../shared/shared.module';
import { appReducers, AppState } from '../../../../store/app.reducer';
import {
  getSelectedTab,
  selectAll as selectAllTabs
} from '../../../../store/tabs/selectors/tabs.selector';
import { selectAll as selectAllSessions } from 'src/app/store/practice-sessions/selectors/practice-sessions.selector';
import {
  getSelectedHighscore,
  selectAll as selectAllHighscores
} from '../../../../store/highscores/selectors/highscores.selector';
import { TabSelect, TabListLoad } from '../../../../store/tabs/actions/tabs.actions';
import {
  HighscoreSave,
  HighscoreSelect,
  HighscoreListLoad
} from '../../../../store/highscores/actions/highscores.actions';
import { PracticeSessionListLoad } from 'src/app/store/practice-sessions/actions/practice-sessions.actions';

const tabs: Tab[] = [
  {
    name: 'Single stroke rolls',
    type: 'rolls',
    drumkit: false,
    timeSignature: '4/4',
    notes: [
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] }
    ],
    $key: '1',
    $exist: () => true
  }
];

const highscores: Highscore[] = [
  { $key: tabs[0].$key, name: tabs[0].name, highscore: 120, date: new Date().valueOf() }
];

const sessions: PracticeSession[] = [
  {
    name: 'Session 1',
    exercises: [],
    repeat: 1,
    created: new Date().valueOf(),
    updated: new Date().valueOf(),
    shared: false,
    drumkit: false
  }
];

describe('ExerciseComponent', () => {
  let component: ExerciseComponent;
  let fixture: ComponentFixture<ExerciseComponent>;
  let el: DebugElement;
  let store: Store<AppState>;
  let router: Router;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [ExerciseComponent],
      providers: [],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        RouterTestingModule,
        StoreModule.forRoot(appReducers)
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = bed.createComponent(ExerciseComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    store = bed.get(Store);
    router = bed.get(Router);

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnInit', () => {
    it('should set the observables', () => {
      spyOn(store, 'select').and.callThrough();
      spyOn(store, 'dispatch').and.callThrough();
      (component as any).exerciseId = '1';

      component.ngOnInit();

      expect(store.select).toHaveBeenCalledTimes(5);
      expect(store.select).toHaveBeenCalledWith(getSelectedTab);
      expect(store.select).toHaveBeenCalledWith(selectAllSessions);
      expect(store.select).toHaveBeenCalledWith(getSelectedHighscore);
      expect(store.select).toHaveBeenCalledWith(selectAllTabs);
      expect(store.select).toHaveBeenCalledWith(selectAllHighscores);

      expect(store.dispatch).toHaveBeenCalledTimes(5);
      expect(store.dispatch).toHaveBeenCalledWith(
        new TabSelect({ id: (component as any).exerciseId })
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        new HighscoreSelect({ id: (component as any).exerciseId })
      );
      expect(store.dispatch).toHaveBeenCalledWith(new TabListLoad());
      expect(store.dispatch).toHaveBeenCalledWith(new HighscoreListLoad());
      expect(store.dispatch).toHaveBeenCalledWith(new PracticeSessionListLoad());
    });
  });

  describe('saveHighscore', () => {
    it('should emit an action', () => {
      spyOn(store, 'dispatch').and.callThrough();
      const highscore = { $key: 'a' } as Highscore;
      component.saveHighscore(highscore);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new HighscoreSave({ highscore }));
    });
  });

  describe('assignExercise', () => {
    it('should scroll to and assignOpen to true', () => {
      spyOn(window, 'scrollTo').and.callThrough();

      component.assignExercise();
      expect(window.scrollTo).toHaveBeenCalledTimes(1);
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
      expect(component.assignOpen).toBeTruthy();
    });
  });

  describe('onAssign', () => {
    beforeEach(() => {
      spyOn(router, 'navigate').and.callFake(() => true);
      (component as any).exerciseId = '1';
    });

    it('should redirect to a new session', () => {
      component.onAssign(null);
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['practice-sessions', 'new'], {
        queryParams: { exercise: '1' }
      });
    });

    it('should redirect to the session edit', () => {
      component.onAssign(sessions[0]);
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(
        ['practice-sessions', sessions[0].$key, 'edit'],
        { queryParams: { exercise: '1' } }
      );
    });
  });

  describe('onAssignCancel', () => {
    it('should assign open to false', () => {
      component.onAssignCancel();
      expect(component.assignOpen).toBeFalsy();
    });
  });
});
