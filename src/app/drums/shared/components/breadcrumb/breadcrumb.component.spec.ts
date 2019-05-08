import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
// app
import {BreadcrumbComponent} from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        BreadcrumbComponent
      ],
      imports: [
        RouterTestingModule
      ]
    });

    fixture = bed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    component.breadcrumb = {
      label: 'Route 1',
      route: '/route1'
    };
    fixture.detectChanges();
    expect(el.query(By.css('a')).nativeElement.textContent).toContain('◀ Route 1');
  });
});
