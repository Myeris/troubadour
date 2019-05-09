import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
// app
import { PracticeSessionFormComponent } from './practice-session-form.component';
import { Tab } from '../../../shared/models/tab.model';
import { Exercise } from '../../../shared/models/exercise.model';
import { PracticeSessionsService } from '../../../shared/services/practice-sessions/practice-sessions.service';
import { ExerciseService } from '../../../shared/services/exercise/exercise.service';
import { VexflowService } from '../../../shared/services/vexflow/vexflow.service';
import { SharedModule } from '../../../shared/shared.module';
import { PracticeSession } from '../../../shared/models/practice-session.model';

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
  },
  {
    name: 'Double stroke rolls',
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
    $key: '2',
    $exist: () => true
  }
];
const session: PracticeSession = {
  name: 'Session1',
  exercises: [
    { hand: 'R', bpm: 60, duration: 60, tabRef: '1', tab: tabs[0], repeat: 1 }
  ],
  repeat: 1,
  created: new Date().valueOf(),
  updated: new Date().valueOf(),
  shared: false,
  drumkit: false,
  duration: 60,
  $key: '1',
  $exist: () => true
};
const exerciseId = '1';
const exercises: Exercise[] = [
  { hand: 'R', bpm: 100, duration: 60, tabRef: '1', tab: tabs[0], repeat: 1 },
  { hand: 'R', bpm: 100, duration: 60, tabRef: '2', tab: tabs[1], repeat: 1 }
];

class MockSessionService {
  getSessionDuration() {
  }
}

class MockExercise {
}

class MockVexflow {
}

describe('PracticeSessionFormComponent', () => {
  let component: PracticeSessionFormComponent;
  let fixture: ComponentFixture<PracticeSessionFormComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        PracticeSessionFormComponent
      ],
      providers: [
        { provide: PracticeSessionsService, useClass: MockSessionService },
        { provide: ExerciseService, useClass: MockExercise },
        { provide: VexflowService, useClass: MockVexflow }
      ],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = bed.createComponent(PracticeSessionFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.session = session;
    component.tabs = tabs;
    component.ngOnChanges({
      session: new SimpleChange(null, session, true),
      tabs: new SimpleChange(null, tabs, true),
      exerciseId: new SimpleChange(null, exerciseId, true)
    });
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  // TODO faire ça un peu mieux
  it('should be displayed', () => {
    expect(el.queryAll(By.css('h3'))[0].nativeElement.textContent).toContain('Session name');
    expect(el.queryAll(By.css('h3'))[1].nativeElement.textContent).toContain('Exercises');
    expect(el.queryAll(By.css('button'))[0].nativeElement.textContent).toContain('Add exercise');
    expect(el.query(By.css('exercise-form'))).toBeDefined();
  });

  it('should show the add exercise form', () => {
    expect(component.showExerciseForm).toBeFalsy();
    component.addExercise();
    expect(component.showExerciseForm).toBeTruthy();
  });

  it('should show the edit exercise form', () => {
    const spy = spyOn(component, 'addExercise').and.callThrough();

    expect(component.showExerciseForm).toBeFalsy();
    component.editExercise(session.exercises[0], 0);
    expect(spy).toHaveBeenCalled();
    expect(component.editedExercise).toEqual(session.exercises[0]);
    expect(component.editedExerciseIndex).toBe(0);
  });

  it('should add the exercise to form', () => {
    const spy = spyOn(component, 'onExerciseChange').and.callThrough();

    component.addExerciseToForm(exercises[0]);
    expect(spy).toHaveBeenCalled();
    expect(component.showExerciseForm).toBeFalsy();
    expect(component.formExercises.length).toBe(2);
  });

  it('should edit exercise in form', () => {
    const spy = spyOn(component, 'onExerciseChange').and.callThrough();

    component.editedExerciseIndex = 0;
    component.editExerciseInForm(exercises[0]);
    expect(component.showExerciseForm).toBeFalsy();
    expect(component.editedExercise).toBeNull();
    expect(component.editedExerciseIndex).toBeNull();
    expect(spy).toHaveBeenCalled();
  });

  it('should remove an exercise', () => {
    const spy = spyOn(component, 'onExerciseChange').and.callThrough();

    expect(component.formExercises.length).toBe(1);
    component.removeExercise(0);
    expect(spy).toHaveBeenCalled();
    expect(component.formExercises.length).toBe(0);
  });

  it('should empty the exercises in the form', () => {
    expect(component.formExercises.length).toBe(1);
    component.emptyExercise();
    expect(component.formExercises.length).toBe(0);
  });

  it('should toggle the deletion message', () => {
    expect(component.toggled).toBeFalsy();
    component.toggle();
    expect(component.toggled).toBeTruthy();
  });

  it('should emit an event to create a session', () => {
    const spy = spyOn(component.created, 'emit').and.callThrough();
    component.createSession();
    expect(spy).toHaveBeenCalledWith(component.form.value);
  });

  it('should emit an event to update a session', () => {
    const spy = spyOn(component.updated, 'emit').and.callThrough();
    component.updateSession();
    expect(spy).toHaveBeenCalledWith(component.form.value);
  });

  it('should emit an event to remove a session', () => {
    const spy = spyOn(component.removed, 'emit').and.callThrough();
    component.removeSession();
    expect(spy).toHaveBeenCalledWith(component.form.value);
  });

  it('should cancel the addition of an exercise', () => {
    component.showExerciseForm = true;
    expect(component.showExerciseForm).toBeTruthy();
    component.cancelAddExercise();
    expect(component.showExerciseForm).toBeFalsy();
  });
});
