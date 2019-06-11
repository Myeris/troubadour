import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
// app
import { StopwatchComponent } from './stopwatch.component';
import { TimerPipe } from '../../pipes/timer/timer.pipe';

describe('StopwatchComponent', () => {
  let component: StopwatchComponent;
  let fixture: ComponentFixture<StopwatchComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [StopwatchComponent, TimerPipe]
    });

    fixture = bed.createComponent(StopwatchComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    expect(el.query(By.css('p'))).toBeDefined();
  });

  describe('ngOnChanges', () => {
    it('should do nothing', () => {
      component.ngOnChanges();
      expect((component as any).startTime).toBe(0);
      expect((component as any).timer$).toBeUndefined();
      expect((component as any).subscription).toBeUndefined();
      expect(component.timerValue).toBe(0);
    });

    it('should reset', () => {
      component.isRunning = false;
      component.timerValue = 10;
      (component as any).startTime = 20;
      (component as any).subscription = of({}).subscribe();

      component.ngOnChanges();
      expect((component as any).startTime).toBe(0);
      expect(component.timerValue).toBe(0);
    });

    it('should start the timer', () => {
      component.isRunning = true;
      component.ngOnChanges();
      expect((component as any).startTime).toBeGreaterThanOrEqual(0);
      expect(component.timerValue).toBeGreaterThanOrEqual(0);
    });
  });
});
