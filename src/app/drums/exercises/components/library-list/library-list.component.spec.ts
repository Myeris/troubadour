import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
// app
import { LibraryListComponent } from './library-list.component';
import { Tab } from '../../../shared/models/tab.model';
import { PracticeSession } from '../../../shared/models/practice-session.model';
import { Tag } from '../../../shared/models/tag.model';
import { SharedModule } from 'src/app/drums/shared/shared.module';

const tab: Tab = {
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
};
const sessions: PracticeSession[] = [
  {
    name: 'Session 1',
    exercises: [],
    repeat: 1,
    created: new Date().valueOf(),
    updated: new Date().valueOf(),
    shared: false,
    drumkit: false,
    $key: '1'
  },
  {
    name: 'Session 2',
    exercises: [],
    repeat: 1,
    created: new Date().valueOf(),
    updated: new Date().valueOf(),
    shared: false,
    drumkit: false,
    $key: '2'
  }
];
const types: Tag[] = [
  { name: 'rolls', color: 'blue', weight: 0, $key: '1', $exist: () => true }
];

describe('LibraryListComponent', () => {
  let component: LibraryListComponent;
  let fixture: ComponentFixture<LibraryListComponent>;
  let el: DebugElement;
  let router: Router;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        LibraryListComponent
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = bed.createComponent(LibraryListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    router = bed.get(Router);

    component.sessions = sessions;
    component.tab = tab;
    component.types = types;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    expect(el.query(By.css('.content')).nativeElement.textContent).toContain(tab.name);
    expect(el.query(By.css('button'))).toBeDefined();
    expect(el.query(By.css('exercise-assign'))).toBeDefined();
  });

  describe('onChanges', () => {
    it('should set the tab type if defined', () => {
      component.ngOnChanges({});
      expect(component.tabType).toEqual(component.types[0]);
    });

    it('should not set a tabType', () => {
      component.types = [...types, { name: 'rolls', color: 'blue', weight: 0, $key: '1', $exist: () => true }];
      component.ngOnChanges({});
      expect(component.tabType).toBeUndefined();
    });

    it('should do nothing', () => {
      component.tab = null;
      component.types = [];
      component.ngOnChanges({});
      expect(component.tabType).toBeUndefined();
    });
  });

  describe('toggle', () => {
    it('should toggle the remove message', () => {
      expect(component.toggled).toBeFalsy();
      component.toggle();
      expect(component.toggled).toBeTruthy();
    });
  });

  describe('assignExercise', () => {
    it('should make the assignOpen prop true', () => {
      expect(component.assignOpen).toBeFalsy();
      component.assignExercise();
      expect(component.assignOpen).toBeTruthy();
    });
  });

  describe('onUpdate', () => {
    beforeEach(() => {
      spyOn(router, 'navigate').and.callFake(() => true);
    });

    it('should redirect to a new session', () => {
      component.onUpdate(null);
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate)
        .toHaveBeenCalledWith(
          ['practice-sessions', 'new'],
          { queryParams: { exercise: '1' } }
        );
    });

    it('should redirect to the session edit', () => {
      component.onUpdate(sessions[0]);
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate)
        .toHaveBeenCalledWith(
          ['practice-sessions', sessions[0].$key, 'edit'],
          { queryParams: { exercise: '1' } }
        );
    });
  });

  describe('onCancel', () => {
    it('should assignOpen to false', () => {
      component.assignOpen = true;
      expect(component.assignOpen).toBeTruthy();

      component.onCancel();
      expect(component.assignOpen).toBeFalsy();
    });
  });
});

