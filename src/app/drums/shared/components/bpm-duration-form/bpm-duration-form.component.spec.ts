import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BpmDurationFormComponent } from './bpm-duration-form.component';
// app

describe('BpmDurationFormComponent', () => {
  let component: BpmDurationFormComponent;
  let fixture: ComponentFixture<BpmDurationFormComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        BpmDurationFormComponent
      ],
      providers: [
        FormBuilder
      ],
      imports: [
        ReactiveFormsModule
      ]
    });

    fixture = bed.createComponent(BpmDurationFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    fixture.detectChanges();

    expect(el.queryAll(By.css('label'))[0].nativeElement.textContent).toContain('BPM');
    expect(el.queryAll(By.css('label'))[1].nativeElement.textContent).toContain('Duration (in seconds)');
    expect(el.queryAll(By.css('input'))[0].nativeElement.value).toBe('60');
    expect(el.queryAll(By.css('input'))[1].nativeElement.value).toBe('60');
  });

  describe('ngOnChanges', () => {
    it('should set bpm', () => {
      component.initBpm = 90;
      component.ngOnChanges({});
      expect(component.form.get('bpm').value).toBe(90);
    });

    it('should set duration', () => {
      component.initDuration = 60;
      component.ngOnChanges({});
      expect(component.form.get('duration').value).toBe(60);
    });
  });

  describe('onChange', () => {
    it('should emit an invalid event on input change if form is invalid', () => {
      const spy = spyOn(component.invalid, 'emit').and.callThrough();
      component.form.get('bpm').setValue(30);
      component.onChange();
      expect(spy).toHaveBeenCalled();
    });

    it('should emit a submitted event on input change if form is valid', () => {
      const spy = spyOn(component.submitted, 'emit').and.callThrough();
      component.form.get('bpm').setValue(90);
      component.onChange();
      expect(spy).toHaveBeenCalled();
    });
  });
});
