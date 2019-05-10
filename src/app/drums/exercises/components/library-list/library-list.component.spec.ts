import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
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

  it('should toggle the remove message', () => {
    expect(component.toggled).toBeFalsy();
    component.toggle();
    expect(component.toggled).toBeTruthy();
  });

  it('should make the assignOpen prop true', () => {
    expect(component.assignOpen).toBeFalsy();
    component.assignExercise();
    expect(component.assignOpen).toBeTruthy();
  });

  it('should redirect on update', (inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigate');
    component.onUpdate(sessions[0]);
    expect(spy).toHaveBeenCalledWith(['practice-sessions', sessions[0].$key, 'edit'], { queryParams: { exercise: tab.$key } });
  })));

  it('should make the assignOpen prop false', () => {
    component.assignOpen = true;
    expect(component.assignOpen).toBeTruthy();

    component.onCancel();
    expect(component.assignOpen).toBeFalsy();
  });
});

