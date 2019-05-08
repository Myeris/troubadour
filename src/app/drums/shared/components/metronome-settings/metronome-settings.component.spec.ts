import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
// app
import {MetronomeSettingsComponent} from './metronome-settings.component';
import {NumberToCollectionPipe} from '../../pipes/number-to-collection/number-to-collection.pipe';
import {NoteCountPipe} from '../../pipes/note-count/note-count.pipe';

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

  it('should get the subdivision value', () => {
    expect(component.subdivision).toBe(4);
  });

  it('should get the accents', () => {
    expect(component.accents.value.toString()).toBe('0');
  });

  it('should emit an changed event on changes', () => {
    const spy = spyOn(component.changed, 'emit');
    component.onChange();
    expect(spy).toHaveBeenCalled();
  });

  it('should tell me if index is an accent', () => {
    expect(component.isAccent(0)).toBeTruthy();
    expect(component.isAccent(1)).toBeFalsy();
  });

  it('should emit an event on accent changes', () => {
    const spy = spyOn(component.changed, 'emit');
    component.onAccentChange(4, {target: {value: {checked: true}}});
    expect(spy).toHaveBeenCalled();
  });
});

