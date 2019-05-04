import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
// app
import {OptionsPipe} from './options.pipe';
import {Exercise} from '../../models/exercise.model';

describe('OptionsPipe', () => {
  /**
   * SHALLOW TESTS
   */
  describe('Shallow OptionsPipe test', () => {
    @Component({
      template: `Exercise: {{ exercise | options }}`
    })
    class TestComponent {
      exercise: Exercise = {
        hand: 'R',
        bpm: 60,
        duration: 60,
        tabRef: 'azerty',
        repeat: 1,
        soundOptions: {
          playAlong: true,
          metronomeOnly: false
        }
      };
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [OptionsPipe, TestComponent]
      });

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });

    it('should transform a bpm exercise into a string displaying the options of the exercise', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain('60 bpm. Start with right hand. Duration: 1 minute. Play along.');
    });

    it('should transform a bpm scale exercise into a string displaying the options of the exercise', () => {
      component.exercise = {
        hand: 'R',
        bpmScale: {
          start: 90,
          stop: 120,
          step: 5
        },
        duration: 16,
        tabRef: 'azerty',
        repeat: 1,
        soundOptions: {
          playAlong: true,
          metronomeOnly: false
        }
      };
      fixture.detectChanges();
      expect(el.textContent).toContain('From 90 bpm to 120 bpm with a step of 5. Start with right hand. Duration: 16 seconds. Play along.');
    });
  });

  /**
   * ISOLATE TESTS
   */
  describe('Isolate OptionsPipe test', () => {
    const pipe = new OptionsPipe();

    it('should transform a bpm exercise into a string displaying the options of the exercise', () => {
      const exercise: Exercise = {
        hand: 'R',
        bpm: 60,
        duration: 60,
        tabRef: 'azerty',
        repeat: 1,
        soundOptions: {
          playAlong: true,
          metronomeOnly: false
        }
      };

      expect(pipe.transform(exercise)).toBe('60 bpm. Start with right hand. Duration: 1 minute. Play along.');
    });

    it('should transform a bpm scale exercise into a string displaying the options of the exercise', () => {
      const exercise: Exercise = {
        hand: 'R',
        bpmScale: {
          start: 90,
          stop: 120,
          step: 5
        },
        duration: 16,
        tabRef: 'azerty',
        repeat: 1,
        soundOptions: {
          playAlong: true,
          metronomeOnly: false
        }
      };

      expect(pipe.transform(exercise)).toBe('From 90 bpm to 120 bpm with a step of 5. Start with right hand. Duration: 16 seconds. Play along.');
    });
  });
});
