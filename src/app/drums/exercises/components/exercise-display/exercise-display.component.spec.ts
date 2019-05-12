import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
// app
import { ExerciseDisplayComponent } from './exercise-display.component';
import { ExerciseService } from '../../../shared/services/exercise/exercise.service';
import { MetronomeService } from '../../../shared/services/metronome/metronome.service';
import { SharedModule } from '../../../shared/shared.module';
import { Tab } from '../../../shared/models/tab.model';
import { Highscore } from '../../../shared/models/highscore.model';

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
const highscore: Highscore = {
  $key: '1',
  name: 'Highscore',
  highscore: 5,
  date: new Date().valueOf()
};

class MetronomeServiceMock {
  init() {
  }

  playExercise() {
  }

  stop() {
  }
}

class ExerciseServiceMock {
  getExerciseDuration() {
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
        { provide: MetronomeService, useClass: MetronomeServiceMock },
        { provide: ExerciseService, useClass: ExerciseServiceMock }
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

    component.tab = tab;
    component.highscore = highscore;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnInit', () => {
    it('should set the exercise', () => {
      expect(component.exercise).toBeUndefined();
      component.ngOnInit();
      expect(component.exercise).toBeDefined();
    });
  });

  describe('play', () => {
    it('should play metronome', () => {
      const spy = spyOn(metronome, 'playExercise');

      component.ngOnInit();
      fixture.detectChanges();

      expect(component.exercise).toBeDefined();
      expect(component.playing).toBeFalsy();

      component.play();
      expect(spy).toHaveBeenCalled();
      expect(component.playing).toBeTruthy();
    });
  });

  describe('stop', () => {
    it('should stop metronome', () => {
      const stopSpy = spyOn(metronome, 'stop');

      component.tab = tab;
      component.ngOnInit();
      fixture.detectChanges();

      component.stop();
      expect(stopSpy).toHaveBeenCalled();
    });
  });

  describe('onCancel', () => {
    it('should set several properties', () => {
      component.onCancel();
      expect(component.showPracticeForm).toBeFalsy();
      expect(component.lastBpm).toBeNull();
      expect(component.showToFailureResult).toBeFalsy();
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should set the practice form visibility to false', async(() => {
      spyOn(component, 'play').and.callFake(() => true);

      component.showPracticeForm = true;
      component.onSubmit({});
      expect(component.showPracticeForm).toBeFalsy();
      expect(component.play).toHaveBeenCalledTimes(1);
      expect(component.play).toHaveBeenCalledWith(true);
    }));

    it('should set the exercise with bpmDuration', () => {
      component.onSubmit({
        bpmDuration: {
          bpm: 60,
          duration: 60
        }
      });

      expect(component.exercise).toEqual(jasmine.objectContaining({
        hand: 'R',
        bpm: 60,
        duration: 60
      }));
      expect(component.practiceMode).toBe('bpmDuration');
    });

    it('should set the exercise with bpmScale', () => {
      component.onSubmit({
        bpmScale: {
          start: 0,
          stop: 20,
          step: 1,
          repeat: 2
        }
      });

      expect(component.exercise).toEqual(jasmine.objectContaining({
        hand: 'R',
        bpmScale: {
          start: 0,
          stop: 20,
          step: 1
        },
        repeat: 2
      }));
      expect(component.practiceMode).toBe('bpmScale');
    });

    it('should set the exercise with toFailure', () => {
      component.onSubmit({
        toFailure: {
          bpm: 90,
          step: 5
        }
      });

      expect(component.exercise).toEqual(jasmine.objectContaining({
        hand: 'R',
        bpmScale: {
          start: 90,
          stop: 250,
          step: 5
        },
        repeat: 20
      }));
      expect(component.practiceMode).toBe('toFailure');
    });

    it('should set the exercise soundOptions', () => {
      component.onSubmit({
        soundOptions: {
          playAlong: true,
          metronomeSettings: {
            subdivision: '4',
            accents: [0]
          }
        }
      });

      expect(component.exercise).toEqual(jasmine.objectContaining({
        soundOptions: {
          playAlong: true,
          metronomeSettings: {
            subdivision: '4',
            accents: [0]
          }
        }
      }));
    });
  });

  describe('setDefaultExercise', () => {
    it('should set the exercise default value', () => {
      expect((component as any).setDefaultExercise())
        .toEqual(jasmine.objectContaining({
        hand: 'R',
        bpm: 60,
        repeat: 1,
        tab,
        tabRef: tab.$key
      }));
    });
  });

  describe('saveHighscore', () => {
    it('should emit an event', () => {
      spyOn(component.highscored, 'emit').and.callFake(() => true);

      component.saveHighscore(90);
      expect(component.lastBpm).toBeNull();
      expect(component.showToFailureResult).toBeFalsy();
      expect(component.highscored.emit).toHaveBeenCalledTimes(1);
      expect(component.highscored.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        highscore: 90
      }));
    });
  });
});
