import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement, SimpleChange} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
// app
import {ExerciseFormComponent} from './exercise-form.component';
import {Tab} from '../../models/tab.model';
import {Exercise} from '../../models/exercise.model';
import {SearchPipe} from '../../pipes/search/search.pipe';
import {OrderTabsPipe} from '../../pipes/order-tabs/order-tabs.pipe';
import {ExerciseService} from '../../services/exercise/exercise.service';

const tabs: Tab[] = [
  {name: 'Tab 1', type: 'rolls', drumkit: false, timeSignature: '4/4', notes: [], $key: '1'},
  {name: 'Tab 2', type: 'rolls', drumkit: false, timeSignature: '4/4', notes: [], $key: '2'},
  {name: 'Tab 3', type: 'rolls', drumkit: false, timeSignature: '4/4', notes: [], $key: '3'}
];

const editedExercise: Exercise = {
  hand: 'R',
  bpm: 60,
  duration: 60,
  tab: tabs[1],
  tabRef: tabs[1].$key,
  repeat: 1,
  soundOptions: {
    metronomeOnly: false,
    playAlong: true
  }
};

class MockExercise {
  getExerciseDuration(timeSignature: string, repeat: number, bpm: number) {
    const beatsPerMeasure = parseInt(timeSignature[0], 16);

    return ((beatsPerMeasure * repeat) / bpm) * 60;
  }
}

describe('ExerciseFormComponent', () => {
  let component: ExerciseFormComponent;
  let fixture: ComponentFixture<ExerciseFormComponent>;
  let el: DebugElement;
  let exerciseService: ExerciseService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        ExerciseFormComponent,
        SearchPipe,
        OrderTabsPipe
      ],
      providers: [
        {provide: ExerciseService, useClass: MockExercise},
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = bed.createComponent(ExerciseFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    exerciseService = bed.get(ExerciseService);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    expect(el.query(By.css('span')).nativeElement.textContent).toContain('Add an exercise');

    const tunnelSteps = el.queryAll(By.css('.tunnel__step'));
    expect(tunnelSteps[0]
      .query(By.css('.tunnel__step__title')).query(By.css('span')).nativeElement.textContent)
      .toContain('1');

    // TODO do more
  });

  it('should handle on changes event', () => {
    expect(component.tabs).toBeUndefined();
    expect(component.selected).toBeUndefined();
    expect(component.editedExercise).toBeUndefined();

    component.tabs = tabs;
    component.ngOnChanges({name: new SimpleChange(null, component.tabs, true)});
    fixture.detectChanges();
    expect(component.tabs.length).toBe(3);

    component.selected = null;
    component.editedExercise = editedExercise;
    component.ngOnChanges({name: new SimpleChange(null, component.editedExercise, true)});
    fixture.detectChanges();
    expect(component.selected).toBeNull();
    expect(component.editedExercise).toEqual(editedExercise);
    expect(component.selectedTabName).toContain(tabs[1].name);
  });

  it('should handle on type change events', () => {
    component.onTypeChange({target: {value: '0'}});
    expect(component.selectedType).toBe(0);
    expect(component.form.get('bpm').value).toBe(90);
    expect(component.form.get('duration').value).toBe(60);
    expect(component.form.get('bpmScale')).toBeNull();

    component.onTypeChange({target: {value: '1'}});
    expect(component.selectedType).toBe(1);
    expect(component.form.get('bpm')).toBeNull();
    expect(component.form.get('duration')).toBeNull();
    expect(component.form.get('bpmScale').get('start').value).toBe(90);
    expect(component.form.get('bpmScale').get('stop').value).toBe(120);
    expect(component.form.get('bpmScale').get('step').value).toBe(5);
  });

  it('should emit an event to add an exercise to a session', () => {
    const spy = spyOn(component.added, 'emit').and.callThrough();

    component.selectedExercise = editedExercise;
    component.form.get('repeat').setValue(30);
    component.form.get('bpm').setValue(120);
    component.form.get('duration').setValue(60);
    component.selectedType = 0;

    component.addExercise();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit an event to edit an exercise of a session', () => {
    const spy = spyOn(component.edited, 'emit').and.callThrough();

    component.editedExercise = editedExercise;
    component.selectedExercise = editedExercise;
    component.ngOnChanges({name: new SimpleChange(null, component.editedExercise, true)});
    component.onTypeChange({target: {value: '0'}});

    component.form.get('repeat').setValue(30);
    component.form.get('bpm').setValue(120);
    component.form.get('duration').setValue(60);

    component.addExercise();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit a cancelled event', () => {
    const spy = spyOn(component.cancelled, 'emit').and.callThrough();
    component.cancel();
    expect(spy).toHaveBeenCalled();
  });
});
