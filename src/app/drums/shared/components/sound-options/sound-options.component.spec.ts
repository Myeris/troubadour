import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
// app
import { SoundOptionsComponent } from './sound-options.component';

describe('SoundOptionsComponent', () => {
  let component: SoundOptionsComponent;
  let fixture: ComponentFixture<SoundOptionsComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [SoundOptionsComponent],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = bed.createComponent(SoundOptionsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    spyOn(component.submitted, 'emit').and.callThrough();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    expect(el.query(By.css('.sound-options'))).toBeDefined();
  });

  describe('get formAccents', () => {
    it('should get the form accents as a form array', () => {
      expect(component.formAccents.length).toBe(1);
      expect(component.formAccents.value.toString()).toContain('0');
    });
  });

  describe('get type', () => {
    it('should get the selected type of sound options', () => {
      expect(component.type).toBe(0);
    });
  });

  describe('ngOnChanges', () => {
    it('should do nothing', () => {
      spyOn(component, 'onTypeChange').and.callFake(() => true);
      component.ngOnChanges({});
      expect(component.onTypeChange).not.toHaveBeenCalled();
    });

    it('should handle playAlong', () => {
      component.initValue = new FormGroup({
        playAlong: new FormControl(true),
        metronomeOnly: new FormControl(false)
      });
      component.ngOnChanges({});
      expect(component.form.get('type').value).toBe(0);
    });

    it('should handle metronomeOnly', () => {
      spyOn(component as any, 'emptyAccents').and.callFake(() => true);

      component.initValue = new FormGroup({
        playAlong: new FormControl(false),
        metronomeOnly: new FormControl(true),
        metronomeSettings: new FormGroup({
          subdivision: new FormControl(4),
          accents: new FormArray([new FormControl(0), new FormControl(2)])
        })
      });

      expect(component.formAccents.length).toBe(1);
      component.ngOnChanges({});
      expect(component.form.get('type').value).toBe(1);
      expect((component as any).emptyAccents).toHaveBeenCalledTimes(1);
      expect(component.formAccents.length).toBe(3);
    });

    it('should call onTypeChange', () => {
      spyOn(component, 'onTypeChange').and.callFake(() => true);
      component.initValue = new FormGroup({
        playAlong: new FormControl(false),
        metronomeOnly: new FormControl(false)
      });
      component.ngOnChanges({});
      expect(component.onTypeChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('onTypeChange', () => {
    it('should emit an event if selectedType is 0', () => {
      component.onTypeChange();
      expect(component.selectedType).toBe(0);
      expect(component.submitted.emit).toHaveBeenCalledWith(component.form);
    });

    it('should not emit an event if selectedType is not 0', () => {
      component.form.get('type').setValue(1);
      component.onTypeChange();
      expect(component.submitted.emit).not.toHaveBeenCalledWith(component.form);
    });
  });

  describe('onMetronomeSettings', () => {
    it('should submit an event', () => {
      const form = new FormGroup({
        subdivision: new FormControl(4),
        accents: new FormArray([new FormControl(0)])
      });

      component.onMetronomeSettingsChange(form);
      expect(component.submitted.emit).toHaveBeenCalledWith(component.form);
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
