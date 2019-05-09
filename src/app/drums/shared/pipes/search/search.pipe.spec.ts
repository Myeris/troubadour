import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
// app
import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {

  /**
   * SHALLOW TESTS
   */
  describe('Shallow SearchPipe test', () => {
    @Component({
      template: `List length: {{ (list | search:'name':searchText).length }}`
    })
    class TestComponent {
      list: { name: string }[] = [
        { name: 'ABC' },
        { name: 'DEF' },
        { name: 'GHI' }
      ];
      searchText: string;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SearchPipe, TestComponent]
      });

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });

    it('should see the entire list', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain('3');
    });

    it('should see only one element of the list', () => {
      component.searchText = 'ABC';
      fixture.detectChanges();
      expect(el.textContent).toContain('1');
    });

    it('should see no element of the list', () => {
      component.searchText = 'slt';
      fixture.detectChanges();
      expect(el.textContent).toContain('0');
    });
  });

  /**
   * ISOLATED TESTS
   */
  describe('Isolate SearchPipe test', () => {
    const pipe = new SearchPipe();

    const list = [
      { name: 'ABC' },
      { name: 'DEF' },
      { name: 'GHI' }
    ];

    it('should filter the list', () => {
      expect(JSON.stringify(pipe.transform(list, 'name', 'ABC'))).toBe(JSON.stringify([{ name: 'ABC' }]));
    });
  });
});
