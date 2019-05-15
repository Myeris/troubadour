import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// app
import { MetronomeSettingsComponent } from './metronome-settings.component';
import { NumberToCollectionPipe } from '../../pipes/number-to-collection/number-to-collection.pipe';
import { NoteCountPipe } from '../../pipes/note-count/note-count.pipe';

describe('MetronomeSettingsComponent', () => {
  let component: MetronomeSettingsComponent;
  let fixture: ComponentFixture<MetronomeSettingsComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        MetronomeSettingsComponent,
        NumberToCollectionPipe,
        NoteCountPipe
      ],
      imports: [
        ReactiveFormsModule
      ]
    });

    fixture = bed.createComponent(MetronomeSettingsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    expect(el.query(By.css('form'))).toBeDefined();
    expect(el.query(By.css('label')).nativeElement.textContent).toContain('Subdivision');
    expect(el.queryAll(By.css('div'))[1].nativeElement.textContent).toContain('Accents');
  });

  describe('subdivision', () => {
    it('should get the subdivision value', () => {
      expect(component.subdivision).toBe(4);
    });
  });

  describe('accents', () => {
    it('should get the accents', () => {
      expect(component.accents.value.toString()).toBe('0');
    });
  });

  describe('ngOnChanges', () => {
    it('should emit an changed event on changes', () => {
      spyOn(component.changed, 'emit').and.callFake(() => true);
      spyOn((component as any), 'emptyAccents').and.callFake(() => true);
      component.initValue = new FormGroup({
        subdivision: new FormControl(4),
        accents: new FormArray([new FormControl(0), new FormControl(2)])
      });
      component.ngOnChanges({});
      expect(component.changed.emit).toHaveBeenCalled();
      expect((component as any).emptyAccents).toHaveBeenCalledTimes(1);
    });


    it('should do nothing', () => {
      const spy = spyOn(component.changed, 'emit');
      component.initValue = null;
      component.ngOnChanges({});
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onChange', () => {
    it('should emit an event', () => {
      spyOn(component.changed, 'emit').and.callFake(() => true);
      component.onChange();
      expect(component.changed.emit).toHaveBeenCalled();
    });
  });

  describe('isAccent', () => {
    it('should tell me if index is an accent', () => {
      expect(component.isAccent(0)).toBeTruthy();
      expect(component.isAccent(1)).toBeFalsy();
    });
  });

  describe('onAccentChange', () => {
    it('should emit an event on accent changes', () => {
      const spy = spyOn(component.changed, 'emit');
      component.onAccentChange(4, { target: { checked: true } });
      expect(spy).toHaveBeenCalled();
    });

    it('should push accent', () => {
      expect(component.accents.length).toBe(1);
      component.onAccentChange(4, { target: { checked: true } });
      expect(component.accents.length).toBe(2);
    });

    it('should remove accent', () => {
      expect(component.accents.length).toBe(1);
      component.onAccentChange(4, { target: { checked: false } });
      expect(component.accents.length).toBe(0);
    });
  });

  describe('emptyAccents', () => {
    it('should empty all accents from form', () => {
      expect(component.accents.length).toBe(1);
      (component as any).emptyAccents();
      expect(component.accents.length).toBe(0);
    });
  });
});

