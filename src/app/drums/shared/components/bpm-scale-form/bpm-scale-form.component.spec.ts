import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// app
import { BpmScaleFormComponent } from './bpm-scale-form.component';

describe('BpmScaleFormComponent', () => {
  let component: BpmScaleFormComponent;
  let fixture: ComponentFixture<BpmScaleFormComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        BpmScaleFormComponent
      ],
      providers: [
        FormBuilder
      ],
      imports: [
        ReactiveFormsModule
      ]
    });

    fixture = bed.createComponent(BpmScaleFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    fixture.detectChanges();

    expect(el.queryAll(By.css('label'))[0].nativeElement.textContent).toContain('Start');
    expect(el.queryAll(By.css('label'))[1].nativeElement.textContent).toContain('Stop');
    expect(el.queryAll(By.css('label'))[2].nativeElement.textContent).toContain('Step');
    expect(el.queryAll(By.css('label'))[3].nativeElement.textContent).toContain('Repeat');
    expect(el.queryAll(By.css('input'))[0].nativeElement.value).toBe('90');
    expect(el.queryAll(By.css('input'))[1].nativeElement.value).toBe('120');
    expect(el.queryAll(By.css('input'))[2].nativeElement.value).toBe('5');
    expect(el.queryAll(By.css('input'))[3].nativeElement.value).toBe('20');
  });

  it('should emit an invalid event on input change if form is invalid', () => {
    const spy = spyOn(component.invalid, 'emit').and.callThrough();
    component.form.get('start').setValue(30);
    component.onChange();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit a submitted event on input change if form is valid', () => {
    const spy = spyOn(component.submitted, 'emit').and.callThrough();
    component.form.get('start').setValue(110);
    component.onChange();
    expect(spy).toHaveBeenCalled();
  });
});
