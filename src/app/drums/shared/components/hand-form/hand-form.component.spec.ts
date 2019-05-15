import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
// app
import { HandFormComponent } from './hand-form.component';

describe('HandFormComponent', () => {
  let component: HandFormComponent;
  let fixture: ComponentFixture<HandFormComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        HandFormComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    });

    fixture = bed.createComponent(HandFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    expect(el.query(By.css('.hand-form'))).toBeDefined();
    expect(el.query(By.css('p')).nativeElement.textContent).toContain('Start with');

    const labels = el.queryAll(By.css('label'));
    expect(labels[0].nativeElement.textContent).toContain('Right hand');
    expect(labels[1].nativeElement.textContent).toContain('Left hand');
  });

  describe('ngOnChanges', () => {
    it('should do nothing if initValue is null', () => {
      component.ngOnChanges({});
      expect(component.form.get('hand').value).toBe('R');
    });

    it('should set the hand value', () => {
      component.initValue = 'L';
      component.ngOnChanges({});
      expect(component.form.get('hand').value).toBe('L');
    });
  });

  describe('onChange', () => {
    it('should emit an invalid event', () => {
      spyOn(component.invalid, 'emit').and.callFake(() => true);
      component.form.get('hand').setValue(null);
      component.onChange();
      expect(component.invalid.emit).toHaveBeenCalledTimes(1);
      expect(component.invalid.emit).toHaveBeenCalledWith('Invalid form');
    });

    it('should emit a submitted event', () => {
      spyOn(component.submitted, 'emit').and.callFake(() => true);
      component.form.get('hand').setValue('L');
      component.onChange();
      expect(component.submitted.emit).toHaveBeenCalledTimes(1);
      expect(component.submitted.emit).toHaveBeenCalledWith(component.form);
    });
  });
});
