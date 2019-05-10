import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
// app
import { ExerciseDisplayComponent } from './exercise-display.component';
import { ExerciseService } from '../../../shared/services/exercise/exercise.service';
import { MetronomeService } from '../../../shared/services/metronome/metronome.service';
import { SharedModule } from '../../../shared/shared.module';
import { Tab } from '../../../shared/models/tab.model';

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

class MockMetronome {
  init() {
    return;
  }

  playExercise() {
    return new Promise((resolve, reject) => {
      return resolve();
    });
  }

  stop() {
    return;
  }
}

class MockExercise {
  getExerciseDuration() {
    return 10;
  }
}

describe('ExerciseDisplayComponent', () => {
  let component: ExerciseDisplayComponent;
  let fixture: ComponentFixture<ExerciseDisplayComponent>;
  let el: DebugElement;
  let metronome: MetronomeService;
  let exercise: ExerciseService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        ExerciseDisplayComponent
      ],
      providers: [
        { provide: MetronomeService, useClass: MockMetronome },
        { provide: ExerciseService, useClass: MockExercise }
      ],
      imports: [
        SharedModule.forRoot()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = bed.createComponent(ExerciseDisplayComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    metronome = bed.get(MetronomeService);
    exercise = bed.get(ExerciseService);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should play metronome', () => {
    const spy = spyOn(metronome, 'playExercise');

    component.tab = tab;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.exercise).toBeDefined();
    expect(component.playing).toBeFalsy();

    component.play();
    expect(spy).toHaveBeenCalled();
    expect(component.playing).toBeTruthy();
  });

  it('should stop metronome', () => {
    const stopSpy = spyOn(metronome, 'stop');

    component.tab = tab;
    component.ngOnInit();
    fixture.detectChanges();

    component.stop();
    expect(stopSpy).toHaveBeenCalled();
  });
});
