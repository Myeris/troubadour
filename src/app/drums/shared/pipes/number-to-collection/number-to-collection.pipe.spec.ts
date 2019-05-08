import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
// app
import {NumberToCollectionPipe} from './number-to-collection.pipe';

describe('NumberToCollectionPipe', () => {
  describe('Shallow NumberToCollectionPipe test', () => {
    @Component({
      template: `Collection length: {{ (number | numberToCollection).length }}`
    })
    class TestComponent {
      number = 0;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [NumberToCollectionPipe, TestComponent]
      });

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });

    it('should convert a number to a collection of indexes', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain('0');

      component.number = 1;
      fixture.detectChanges();
      expect(el.textContent).toContain('1');

      component.number = 5;
      fixture.detectChanges();
      expect(el.textContent).toContain('5');
    });
  });

  /**
   * ISOLATE TESTS
   */
  describe('Isolate NumberToCollectionPipe test', () => {
    const pipe = new NumberToCollectionPipe();

    it('should convert a number to a collection of indexes', () => {
      expect(JSON.stringify(pipe.transform(5))).toBe('[0,1,2,3,4]');
      expect(JSON.stringify(pipe.transform(0))).toBe('[]');
    });

    it('should throw an error if passed value is not a number', () => {
      expect(() => {
        pipe.transform(null);
      }).toThrow(new Error('Passed value must be a number'));

      expect(() => {
        pipe.transform('test');
      }).toThrow(new Error('Passed value must be a number'));

      expect(() => {
        pipe.transform(true);
      }).toThrow(new Error('Passed value must be a number'));
    });
  });
});
