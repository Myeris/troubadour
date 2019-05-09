import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
// app
import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  /**
   * SHALLOW TESTS
   */
  describe('Shallow DurationPipe test', () => {
    @Component({
      template: `Duration: {{ duration | duration }}`
    })
    class TestComponent {
      duration = 1;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DurationPipe, TestComponent]
      });

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });

    it('should convert an int to duration format', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain('1 second');

      component.duration = 12;
      fixture.detectChanges();
      expect(el.textContent).toContain('12 seconds');

      component.duration = 60;
      fixture.detectChanges();
      expect(el.textContent).toContain('1 minute');

      component.duration = 120;
      fixture.detectChanges();
      expect(el.textContent).toContain('2 minutes');

      component.duration = 179;
      fixture.detectChanges();
      expect(el.textContent).toContain('2 minutes');

      component.duration = 180;
      fixture.detectChanges();
      expect(el.textContent).toContain('3 minutes');
    });
  });

  /**
   * ISOLATE TESTS
   */
  describe('Isolate DurationPipe test', () => {
    const pipe = new DurationPipe();

    it('should convert an int to duration format', () => {
      expect(pipe.transform(1)).toBe('1 second');
      expect(pipe.transform(12)).toBe('12 seconds');
      expect(pipe.transform(60)).toBe('1 minute');
      expect(pipe.transform(120)).toBe('2 minutes');
      expect(pipe.transform(179)).toBe('2 minutes');
      expect(pipe.transform(180)).toBe('3 minutes');
    });

    it('should do nothing if passed value is not number', () => {
      expect(pipe.transform('hello')).toBe('hello');
      expect(pipe.transform(true)).toBe(true);
    });

    it('should return 0 if passed value is 0', () => {
      expect(pipe.transform(0)).toBe(0);
    });
  });
});
