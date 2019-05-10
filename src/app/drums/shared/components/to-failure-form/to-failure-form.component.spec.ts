import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// app
import { ToFailureFormComponent } from './to-failure-form.component';

describe('ToFailureFormComponent', () => {
  let component: ToFailureFormComponent;
  let fixture: ComponentFixture<ToFailureFormComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        ToFailureFormComponent
      ],
      providers: [
        FormBuilder
      ],
      imports: [
        ReactiveFormsModule
      ]
    });

    fixture = bed.createComponent(ToFailureFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    fixture.detectChanges();

    expect(el.queryAll(By.css('label'))[0].nativeElement.textContent).toContain('BPM (starting value)');
    expect(el.queryAll(By.css('label'))[1].nativeElement.textContent).toContain('Step');
    expect(el.queryAll(By.css('input'))[0].nativeElement.value).toBe('90');
    expect(el.queryAll(By.css('input'))[1].nativeElement.value).toBe('5');
  });

  it('should emit an invalid event on input change if form is invalid', () => {
    const spy = spyOn(component.invalid, 'emit').and.callThrough();
    component.form.get('bpm').setValue(30);
    component.onChange();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit a submitted event on input change if form is valid', () => {
    const spy = spyOn(component.submitted, 'emit').and.callThrough();
    component.form.get('bpm').setValue(120);
    component.onChange();
    expect(spy).toHaveBeenCalled();
  });
});

