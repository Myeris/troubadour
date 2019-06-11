import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
// app
import { BreadcrumbComponent } from './breadcrumb.component';
import { asPureExpressionData } from '@angular/core/src/view';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let el: DebugElement;
  let router: Router;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent],
      imports: [RouterTestingModule]
    });

    fixture = bed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    router = bed.get(Router);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    component.breadcrumb = {
      label: 'Route 1',
      route: '/route1',
      params: {}
    };
    fixture.detectChanges();
    expect(el.query(By.css('a')).nativeElement.textContent).toContain('◀ Route 1');
  });

  describe('navigate', () => {
    it('should navigate', () => {
      spyOn(router, 'navigate').and.callFake(() => true);
      component.breadcrumb = {
        label: 'Route 1',
        route: '/route1',
        params: {}
      };
      component.navigate();
      expect(router.navigate).toHaveBeenCalledTimes(1);
    });
  });
});
