import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
// app
import { StopwatchComponent } from './stopwatch.component';
import { TimerPipe } from '../../pipes/timer/timer.pipe';

describe('StopwatchComponent', () => {
  let component: StopwatchComponent;
  let fixture: ComponentFixture<StopwatchComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        StopwatchComponent,
        TimerPipe
      ]
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
    // TODO
  });
});
