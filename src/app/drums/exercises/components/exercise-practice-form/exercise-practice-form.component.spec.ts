import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
// app
import { ExercisePracticeFormComponent } from './exercise-practice-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

describe('ExercisePracticeForm', () => {
  let component: ExercisePracticeFormComponent;
  let fixture: ComponentFixture<ExercisePracticeFormComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [ExercisePracticeFormComponent],
      imports: [SharedModule.forRoot()]
    });

    fixture = bed.createComponent(ExercisePracticeFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    expect(el.query(By.css('.exercise-practice-form__title')).nativeElement.textContent).toContain(
      'Practice this exercise'
    );

    const labels = el.queryAll(By.css('label'));
    const buttons = el.queryAll(By.css('button'));

    expect(labels[0].nativeElement.textContent).toContain('BPM & Duration');
    expect(labels[1].nativeElement.textContent).toContain('BPM scale');
    expect(labels[2].nativeElement.textContent).toContain('Road to failure');

    expect(buttons[0].nativeElement.textContent).toContain('Practice!');
    expect(buttons[1].nativeElement.textContent).toContain('Cancel');
  });

  it('should display the appropriate form depending on the selected checkbox', () => {
    component.toggleForm('bpmDuration');
    expect(el.query(By.css('bpm-duration-form'))).toBeDefined();
    expect(el.query(By.css('bpm-scale-form'))).toBeNull();
    expect(el.query(By.css('to-failure-form'))).toBeNull();
    expect(el.query(By.css('sound-options'))).toBeDefined();

    component.toggleForm('bpmScale');
    expect(el.query(By.css('bpm-duration-form'))).toBeNull();
    expect(el.query(By.css('bpm-scale-form'))).toBeDefined();
    expect(el.query(By.css('to-failure-form'))).toBeNull();
    expect(el.query(By.css('sound-options'))).toBeDefined();

    component.toggleForm('toFailure');
    expect(el.query(By.css('bpm-duration-form'))).toBeNull();
    expect(el.query(By.css('bpm-scale-form'))).toBeNull();
    expect(el.query(By.css('to-failure-form'))).toBeDefined();
    expect(el.query(By.css('sound-options'))).toBeDefined();
  });

  describe('showSoundOptions', () => {
    it('should return true if one of the forms is displayed', () => {
      component.showForms.bpmScale = true;
      expect(component.showSoundOptions).toBeTruthy();

      component.showForms.bpmScale = false;
      component.showForms.bpmDuration = true;
      expect(component.showSoundOptions).toBeTruthy();

      component.showForms.bpmDuration = false;
      component.showForms.toFailure = true;
      expect(component.showSoundOptions).toBeTruthy();
    });

    it('should return false if none of the forms is displayed', () => {
      expect(component.showForms.toFailure).toBeFalsy();
      expect(component.showForms.bpmDuration).toBeFalsy();
      expect(component.showForms.bpmScale).toBeFalsy();
      expect(component.showSoundOptions).toBeFalsy();
    });
  });

  describe('formAccents', () => {
    it('should return the accents as a form array', () => {
      // TODO
    });
  });

  describe('onFormValueChange', () => {
    it('should set the value to the form', () => {
      spyOn(component.form, 'setControl').and.callFake(() => true);

      const formData: FormGroup = new FormGroup({
        bpm: new FormControl(90),
        duration: new FormControl(60)
      });

      component.onFormValueChange('bpmDuration', formData);

      expect(component.form.setControl).toHaveBeenCalledTimes(1);
      expect(component.form.setControl).toHaveBeenCalledWith('bpmDuration', formData);
    });
  });

  describe('toggleForm', () => {
    it('should toggle the forms', () => {
      expect(component.showForms.toFailure).toBeFalsy();
      expect(component.showForms.bpmDuration).toBeFalsy();
      expect(component.showForms.bpmScale).toBeFalsy();

      component.toggleForm('toFailure');
      expect(component.showForms.toFailure).toBeTruthy();
      expect(component.showForms.bpmDuration).toBeFalsy();
      expect(component.showForms.bpmScale).toBeFalsy();

      component.toggleForm('bpmDuration');
      expect(component.showForms.toFailure).toBeFalsy();
      expect(component.showForms.bpmDuration).toBeTruthy();
      expect(component.showForms.bpmScale).toBeFalsy();

      component.toggleForm('bpmScale');
      expect(component.showForms.toFailure).toBeFalsy();
      expect(component.showForms.bpmDuration).toBeFalsy();
      expect(component.showForms.bpmScale).toBeTruthy();
    });
  });

  describe('isButtonDisabled', () => {
    it('should return true if button is disabled', () => {
      component.showForms.toFailure = true;
      expect(component.isButtonDisabled()).toBeFalsy();
    });

    it('should return false if button is enabled', () => {
      expect(component.isButtonDisabled()).toBeTruthy();
    });
  });

  describe('cancel', () => {
    it('should emit an event on form cancel', () => {
      const spy = spyOn(component.cancelled, 'emit');
      component.cancel();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('submit', () => {
    it('should emit an event on form submit', () => {
      spyOn(component.submitted, 'emit').and.callFake(() => true);
      spyOn(component.form, 'removeControl').and.callFake(() => true);

      component.submit();
      expect(component.form.removeControl).toHaveBeenCalledTimes(3);
      expect(component.submitted.emit).toHaveBeenCalledTimes(1);
    });

    it('should remove control', () => {
      component.showForms = {
        toFailure: true,
        bpmDuration: false,
        bpmScale: false
      };

      component.submit();
      expect(component.form.get('toFailure').value).toBeDefined();
      expect(component.form.get('bpmDuration')).toBeNull();
      expect(component.form.get('bpmScale')).toBeNull();
    });
  });

  describe('onSoundOptionsChange', () => {
    it('should set options if type is 0', () => {
      const form: FormGroup = new FormGroup({
        type: new FormControl(0),
        settings: new FormGroup({
          subdivision: new FormControl('4'),
          accents: new FormArray([new FormControl(0)])
        })
      });

      component.onSoundOptionsChange(form);

      expect(component.form.get('soundOptions').get('playAlong').value).toBeTruthy();
      expect(component.form.get('soundOptions').get('metronomeOnly').value).toBeFalsy();
    });

    it('should set options if type is 1', () => {
      spyOn(component as any, 'emptyAccents').and.callFake(() => true);
      spyOn(component.formAccents, 'push').and.callFake(() => true);

      const form: FormGroup = new FormGroup({
        type: new FormControl(1),
        settings: new FormGroup({
          subdivision: new FormControl('4'),
          accents: new FormArray([new FormControl(0), new FormControl(1)])
        })
      });

      component.onSoundOptionsChange(form);

      expect((component as any).emptyAccents).toHaveBeenCalledTimes(1);
      expect(component.form.get('soundOptions').get('playAlong').value).toBeFalsy();
      expect(component.form.get('soundOptions').get('metronomeOnly').value).toBeTruthy();
      expect(component.formAccents.push).toHaveBeenCalledTimes(2);
    });
  });

  describe('emptyAccents', () => {
    it('should empty all accents from form', () => {
      expect(component.formAccents.length).toBe(1);
      (component as any).emptyAccents();
      expect(component.formAccents.length).toBe(0);
    });
  });
});
