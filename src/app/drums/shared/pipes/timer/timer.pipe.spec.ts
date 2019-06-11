import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
// app
import { TimerPipe } from './timer.pipe';

describe('TimerPipe', () => {
  describe('Shallow TimerPipe test', () => {
    @Component({
      template: `
        Timer: {{ timerValue | timer }}
      `
    })
    class TestComponent {
      timerValue = 0;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    beforeEach(() => {
      const bed = TestBed.configureTestingModule({
        declarations: [TimerPipe, TestComponent]
      });

      fixture = bed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });

    it('should display the timer', () => {
      component.timerValue = 0;
      fixture.detectChanges();
      expect(el.textContent).toBe('Timer: 00:00');

      component.timerValue = 60;
      fixture.detectChanges();
      expect(el.textContent).toBe('Timer: 01:00');

      component.timerValue = 90;
      fixture.detectChanges();
      expect(el.textContent).toBe('Timer: 01:30');

      component.timerValue = 600;
      fixture.detectChanges();
      expect(el.textContent).toBe('Timer: 10:00');
    });
  });

  describe('Isolate TimerPipe test', () => {
    const pipe = new TimerPipe();

    it('should display the timer', () => {
      expect(pipe.transform(0)).toBe('00:00');
      expect(pipe.transform(60)).toBe('01:00');
      expect(pipe.transform(90)).toBe('01:30');
      expect(pipe.transform(600)).toBe('10:00');
    });
  });
});
