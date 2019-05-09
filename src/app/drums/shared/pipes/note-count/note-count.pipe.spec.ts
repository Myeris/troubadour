import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
// app
import { NoteCountPipe } from './note-count.pipe';

describe('NoteCountPipe', () => {

  /**
   * SHALLOW TEST
   */
  describe('Shallow NoteCountPipe test', () => {
    @Component({
      template: `Note count: {{ noteIndex | noteCount: subdivion }}`
    })
    class TestComponent {
      noteIndex = 0;
      subdivion = 4;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    beforeEach(() => {
      const bed = TestBed.configureTestingModule({
        declarations: [TestComponent, NoteCountPipe]
      });

      fixture = bed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });

    describe('should return the right note count number', () => {
      it('for a subdivision of 4', () => {
        component.subdivion = 4;

        component.noteIndex = 0;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: 1');

        component.noteIndex = 1;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: 2');

        component.noteIndex = 2;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: 3');

        component.noteIndex = 3;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: 4');
      });

      it('for a subdivision of 8', () => {
        component.subdivion = 8;

        component.noteIndex = 0;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: 1');

        component.noteIndex = 1;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: &');

        component.noteIndex = 2;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: 2');

        component.noteIndex = 3;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: &');

        component.noteIndex = 4;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: 3');

        component.noteIndex = 5;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: &');

        component.noteIndex = 6;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: 4');

        component.noteIndex = 7;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: &');
      });

      it('for a subdivision of 16', () => {
        component.subdivion = 16;

        component.noteIndex = 0;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: 1');

        component.noteIndex = 1;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: e');

        component.noteIndex = 2;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: &');

        component.noteIndex = 3;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: a');

        component.noteIndex = 4;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: 2');

        component.noteIndex = 5;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: e');

        component.noteIndex = 6;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: &');

        component.noteIndex = 7;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: a');

        component.noteIndex = 8;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: 3');

        component.noteIndex = 9;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: e');

        component.noteIndex = 10;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: &');

        component.noteIndex = 11;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: a');

        component.noteIndex = 12;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: 4');

        component.noteIndex = 13;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: e');

        component.noteIndex = 14;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: &');

        component.noteIndex = 15;
        fixture.detectChanges();
        expect(el.textContent).toBe('Note count: a');

      });
    });
  });

  /**
   * ISOLATE TESTS
   */
  describe('Isolate NoteCountPipe test', () => {
    const pipe = new NoteCountPipe();

    describe('should return the right note count', () => {
      it('for a subdivision of 4', () => {
        const subdivison = 4;
        expect(pipe.transform(0, subdivison)).toBe('1');
        expect(pipe.transform(1, subdivison)).toBe('2');
        expect(pipe.transform(2, subdivison)).toBe('3');
        expect(pipe.transform(3, subdivison)).toBe('4');
      });

      it('for a subdivision of 8', () => {
        const subdivison = 8;
        expect(pipe.transform(0, subdivison)).toBe('1');
        expect(pipe.transform(1, subdivison)).toBe('&');
        expect(pipe.transform(2, subdivison)).toBe('2');
        expect(pipe.transform(3, subdivison)).toBe('&');
        expect(pipe.transform(4, subdivison)).toBe('3');
        expect(pipe.transform(5, subdivison)).toBe('&');
        expect(pipe.transform(6, subdivison)).toBe('4');
        expect(pipe.transform(7, subdivison)).toBe('&');
      });

      it('for a subdivision of 16', () => {
        const subdivison = 16;
        expect(pipe.transform(0, subdivison)).toBe('1');
        expect(pipe.transform(1, subdivison)).toBe('e');
        expect(pipe.transform(2, subdivison)).toBe('&');
        expect(pipe.transform(3, subdivison)).toBe('a');
        expect(pipe.transform(4, subdivison)).toBe('2');
        expect(pipe.transform(5, subdivison)).toBe('e');
        expect(pipe.transform(6, subdivison)).toBe('&');
        expect(pipe.transform(7, subdivison)).toBe('a');
        expect(pipe.transform(8, subdivison)).toBe('3');
        expect(pipe.transform(9, subdivison)).toBe('e');
        expect(pipe.transform(10, subdivison)).toBe('&');
        expect(pipe.transform(11, subdivison)).toBe('a');
        expect(pipe.transform(12, subdivison)).toBe('4');
        expect(pipe.transform(13, subdivison)).toBe('e');
        expect(pipe.transform(14, subdivison)).toBe('&');
        expect(pipe.transform(15, subdivison)).toBe('a');
      });
    });
  });

});
