import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
// app
import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  /**
   * SHALLOW TESTS
   */
  describe('Shallow CapitalizePipe test', () => {
    @Component({
      template: `
        Capitalize: {{ string | capitalize }}
      `
    })
    class TestComponent {
      string = 'rolls';
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CapitalizePipe, TestComponent]
      });

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });

    it('should capitalize the first letter of a string', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain('Rolls');

      component.string = 'ROLLS';
      fixture.detectChanges();
      expect(el.textContent).toContain('ROLLS');

      component.string = 'Rolls';
      fixture.detectChanges();
      expect(el.textContent).toContain('Rolls');

      component.string = 'j\'apprécie les fruits au sirop';
      fixture.detectChanges();
      expect(el.textContent).toContain('J\'apprécie les fruits au sirop');
    });
  });

  /**
   * ISOLATE TESTS
   */
  describe('Isolate CapitalizePipe test', () => {
    const pipe = new CapitalizePipe();

    it('should capitalize the first letter of a string', () => {
      expect(pipe.transform('rolls')).toBe('Rolls');
      expect(pipe.transform('ROLLS')).toBe('ROLLS');
      expect(pipe.transform('Rolls')).toBe('Rolls');
      expect(pipe.transform('j\'apprécie les fruits au sirop')).toBe(
        'J\'apprécie les fruits au sirop'
      );
    });

    it('shoud return the passed value if value passed is not a string', () => {
      expect(pipe.transform(12345)).toBe(12345);
      expect(pipe.transform(12.345)).toBe(12.345);
      expect(pipe.transform(true)).toBe(true);
    });
  });
});
