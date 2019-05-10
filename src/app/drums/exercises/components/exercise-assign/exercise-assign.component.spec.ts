import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
// app
import { ExerciseAssignComponent } from './exercise-assign.component';
import { Tab } from '../../../shared/models/tab.model';

const tab: Tab = {
  name: 'Tab 1',
  type: 'rolls',
  drumkit: false,
  timeSignature: '4/4',
  notes: [],
  $key: '1',
  $exist: () => true
};

describe('ExerciseAssignComponent', () => {
  let component: ExerciseAssignComponent;
  let fixture: ComponentFixture<ExerciseAssignComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        ExerciseAssignComponent
      ],
      imports: [
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = bed.createComponent(ExerciseAssignComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    component.tab = tab;
    fixture.detectChanges();

    expect(el.query(By.css('h1')).nativeElement.textContent).toContain(`Assign ${tab.name} exercise`);
    expect(el.query(By.css('.btn_add')).nativeElement.textContent).toContain('New practice session');
    expect(el.queryAll(By.css('button'))[0].nativeElement.textContent).toContain('Update');
    expect(el.queryAll(By.css('button'))[1].nativeElement.textContent).toContain('Cancel');
  });

  it('should capture an exception when trying to update an exercise that doesn\'t exist', () => {
    // TODO fix this
    // const spy = spyOn(sentry, 'captureException');
    //
    // component.sessions = [
    //   {
    //     name: 'Session 1',
    //     exercises: [],
    //     repeat: 1,
    //     created: new Date().valueOf(),
    //     updated: new Date().valueOf(),
    //     shared: false,
    //     drumkit: false,
    //     $key: '1'
    //   },
    //   {
    //     name: 'Session 2',
    //     exercises: [],
    //     repeat: 1,
    //     created: new Date().valueOf(),
    //     updated: new Date().valueOf(),
    //     shared: false,
    //     drumkit: false,
    //     $key: '2'
    //   }
    // ];
    // component.selected = '3';
    //
    // component.updateAssign();
    // spy.and.returnValue('Session not found');
    // expect(spy).toHaveBeenCalledWith('Session not found');
  });

  it('should capture an exception when trying to update an exercise which keys is a duplicate in the sessions list', () => {
    // TODO fix this
    // const spy = spyOn(sentry, 'captureException');
    //
    // component.sessions = [
    //   {
    //     name: 'Session 1',
    //     exercises: [],
    //     repeat: 1,
    //     created: new Date().valueOf(),
    //     updated: new Date().valueOf(),
    //     shared: false,
    //     drumkit: false,
    //     $key: '1'
    //   },
    //   {
    //     name: 'Session 2',
    //     exercises: [],
    //     repeat: 1,
    //     created: new Date().valueOf(),
    //     updated: new Date().valueOf(),
    //     shared: false,
    //     drumkit: false,
    //     $key: '1'
    //   }
    // ];
    // component.selected = '1';
    //
    // component.updateAssign();
    // spy.and.returnValue('Session key not unique');
    // expect(spy).toHaveBeenCalledWith('Session key not unique');
  });

  it('should emit an event when assigning a session to an exercise', () => {
    const spy = spyOn(component.update, 'emit');

    component.sessions = [
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
    component.selected = '1';

    component.updateAssign();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit an event when canceling the assign action', () => {
    const spy = spyOn(component.cancel, 'emit');

    component.cancelAssign();
    expect(spy).toHaveBeenCalled();
  });

  it('should toggle the item if it\'s selected', () => {
    component.sessions = [
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
    component.toggleItem('1');
    expect(component.selected).toBe('1');
  });

  it('should tell if the selected object exists', () => {
    component.selected = '1';
    expect(component.exists('2')).toBeFalsy();

    component.selected = '2';
    expect(component.exists('2')).toBeTruthy();
  });
});
