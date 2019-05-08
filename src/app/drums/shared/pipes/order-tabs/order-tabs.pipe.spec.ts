import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
// app
import {OrderTabsPipe} from './order-tabs.pipe';
import {Tab} from '../../models/tab.model';
import {Tag} from '../../models/tag.model';

describe('OrderTabsPipe', () => {

  /**
   * SHALLOW TESTS
   */
  describe('Shallow OrderTabsPipe test', () => {
    @Component({
      template: `{{ (tabs | orderTabs:(types)) | json }}`
    })
    class TestComponent {
      tabs: Tab[] = [
        {name: 'Paradiddle', type: 'paradiddles', drumkit: false, timeSignature: '4/4', notes: []},
        {name: 'Single stroke roll', type: 'rolls', drumkit: false, timeSignature: '4/4', notes: []},
        {name: 'Flam', type: 'flams', drumkit: false, timeSignature: '4/4', notes: []},
        {name: 'Double stroke roll', type: 'rolls', drumkit: false, timeSignature: '4/4', notes: []},
        {name: 'Triple paradiddle', type: 'paradiddles', drumkit: false, timeSignature: '4/4', notes: []},
        {name: 'Flam drag', type: 'flams', drumkit: false, timeSignature: '4/4', notes: []},
        {name: 'Eleven stroke roll', type: 'rolls', drumkit: false, timeSignature: '4/4', notes: []},
        {name: 'Double paradiddle', type: 'paradiddles', drumkit: false, timeSignature: '4/4', notes: []},
        {name: 'Flam tap', type: 'flams', drumkit: false, timeSignature: '4/4', notes: []}
      ];

      types: Tag[] = [
        {name: 'rolls', weight: 0, color: 'blue'},
        {name: 'paradiddles', weight: 1, color: 'green'},
        {name: 'flams', weight: 2, color: 'red'}
      ];
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [OrderTabsPipe, TestComponent]
      });

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });

    it('should order a list of tabs by type, weight and name', () => {
      const expected: Tab[] = [
        {
          name: 'Double stroke roll',
          type: 'rolls',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'rolls', weight: 0, color: 'blue'}
        },
        {
          name: 'Eleven stroke roll',
          type: 'rolls',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'rolls', weight: 0, color: 'blue'}
        },
        {
          name: 'Single stroke roll',
          type: 'rolls',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'rolls', weight: 0, color: 'blue'}
        },
        {
          name: 'Double paradiddle',
          type: 'paradiddles',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'paradiddles', weight: 1, color: 'green'}
        },
        {
          name: 'Paradiddle',
          type: 'paradiddles',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'paradiddles', weight: 1, color: 'green'}
        },
        {
          name: 'Triple paradiddle',
          type: 'paradiddles',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'paradiddles', weight: 1, color: 'green'}
        },
        {
          name: 'Flam',
          type: 'flams',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'flams', weight: 2, color: 'red'}
        },
        {
          name: 'Flam drag',
          type: 'flams',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'flams', weight: 2, color: 'red'}
        },
        {
          name: 'Flam tap',
          type: 'flams',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'flams', weight: 2, color: 'red'}
        }
      ];

      fixture.detectChanges();
      expect(JSON.stringify(JSON.parse(el.innerText))).toContain(JSON.stringify(expected));
    });
  });

  /**
   * ISOLATE TESTS
   */
  describe('Isolate OrderTabsPipe test', () => {
    const pipe = new OrderTabsPipe();

    it('should order a list of tabs by type, weight and name', () => {
      const tabs: Tab[] = [
        {name: 'Paradiddle', type: 'paradiddles', drumkit: false, timeSignature: '4/4', notes: []},
        {name: 'Single stroke roll', type: 'rolls', drumkit: false, timeSignature: '4/4', notes: []},
        {name: 'Flam', type: 'flams', drumkit: false, timeSignature: '4/4', notes: []},
        {name: 'Double stroke roll', type: 'rolls', drumkit: false, timeSignature: '4/4', notes: []},
        {name: 'Triple paradiddle', type: 'paradiddles', drumkit: false, timeSignature: '4/4', notes: []},
        {name: 'Flam drag', type: 'flams', drumkit: false, timeSignature: '4/4', notes: []},
        {name: 'Eleven stroke roll', type: 'rolls', drumkit: false, timeSignature: '4/4', notes: []},
        {name: 'Double paradiddle', type: 'paradiddles', drumkit: false, timeSignature: '4/4', notes: []},
        {name: 'Flam tap', type: 'flams', drumkit: false, timeSignature: '4/4', notes: []}
      ];

      const types: Tag[] = [
        {name: 'rolls', weight: 0, color: 'blue'},
        {name: 'paradiddles', weight: 1, color: 'green'},
        {name: 'flams', weight: 2, color: 'red'}
      ];

      const expected: Tab[] = [
        {
          name: 'Double stroke roll',
          type: 'rolls',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'rolls', weight: 0, color: 'blue'}
        },
        {
          name: 'Eleven stroke roll',
          type: 'rolls',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'rolls', weight: 0, color: 'blue'}
        },
        {
          name: 'Single stroke roll',
          type: 'rolls',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'rolls', weight: 0, color: 'blue'}
        },
        {
          name: 'Double paradiddle',
          type: 'paradiddles',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'paradiddles', weight: 1, color: 'green'}
        },
        {
          name: 'Paradiddle',
          type: 'paradiddles',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'paradiddles', weight: 1, color: 'green'}
        },
        {
          name: 'Triple paradiddle',
          type: 'paradiddles',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'paradiddles', weight: 1, color: 'green'}
        },
        {
          name: 'Flam',
          type: 'flams',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'flams', weight: 2, color: 'red'}
        },
        {
          name: 'Flam drag',
          type: 'flams',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'flams', weight: 2, color: 'red'}
        },
        {
          name: 'Flam tap',
          type: 'flams',
          drumkit: false,
          timeSignature: '4/4',
          notes: [],
          typeObject: {name: 'flams', weight: 2, color: 'red'}
        }
      ];

      expect(JSON.stringify(pipe.transform(tabs, types))).toBe(JSON.stringify(expected));
    });
  });
});
