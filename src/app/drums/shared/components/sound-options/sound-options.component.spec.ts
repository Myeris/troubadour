import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
// app
import {SoundOptionsComponent} from './sound-options.component';

describe('SoundOptionsComponent', () => {
  let component: SoundOptionsComponent;
  let fixture: ComponentFixture<SoundOptionsComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        SoundOptionsComponent
      ],
      imports: [
        ReactiveFormsModule
      ],
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
});
