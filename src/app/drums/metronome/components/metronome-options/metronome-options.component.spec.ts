import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
// app
import { MetronomeOptionsComponent } from './metronome-options.component';
import { SharedModule } from '../../../shared/shared.module';

describe('MetronomeOptionsComponent', () => {
  let component: MetronomeOptionsComponent;
  let fixture: ComponentFixture<MetronomeOptionsComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        MetronomeOptionsComponent
      ],
      imports: [
        ReactiveFormsModule,
        SharedModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = bed.createComponent(MetronomeOptionsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    component.form.get('bpm').setValue(100);
    component.form.get('beat').setValue(4);
    component.accents.push(new FormControl(0));

    fixture.detectChanges();
    expect(el.query(By.css('.bpm')).nativeElement.textContent).toContain('100 BPM');
    expect(el.query(By.css('.player')).nativeElement.textContent).toContain('Play');
    expect(el.query(By.css('.slider'))).toBeDefined();

    expect(el.query(By.css('.decrease')).nativeElement.textContent).toContain('-');
    expect(el.query(By.css('.increase')).nativeElement.textContent).toContain('+');

    expect(el.query(By.css('.visual'))).toBeDefined();
    expect(el.query(By.css('#metronome-0'))).toBeDefined();
    expect(el.query(By.css('#metronome-0')).nativeElement.textContent).toContain('◉');
    expect(el.query(By.css('#metronome-1'))).toBeDefined();
    expect(el.query(By.css('#metronome-1')).nativeElement.textContent).toContain('◎');
    expect(el.query(By.css('#metronome-2'))).toBeDefined();
    expect(el.query(By.css('#metronome-2')).nativeElement.textContent).toContain('◎');
    expect(el.query(By.css('#metronome-3'))).toBeDefined();
    expect(el.query(By.css('#metronome-3')).nativeElement.textContent).toContain('◎');

    expect(el.query(By.css('.btn__options > a')).nativeElement.textContent).toContain('Advanced mode');
    expect(el.query(By.css('.options'))).toBeNull();
  });

  it('should be able to set an accent', () => {
    component.setAccent(1);
    expect(component.accents.length).toBe(2);
    component.setAccent(1);
    expect(component.accents.length).toBe(1);
  });

  it('should tell if note is accent', () => {
    expect(component.isAccent(0)).toBeTruthy();
    expect(component.isAccent(1)).toBeFalsy();
    expect(component.isAccent(2)).toBeFalsy();
    expect(component.isAccent(3)).toBeFalsy();
  });

  it('should emit an event to start metronome', () => {
    const spy = spyOn(component.played, 'emit').and.callThrough();
    component.play();
    expect(spy).toHaveBeenCalledWith(component.form.value);
  });

  it('should emit and event to stop metronome', () => {
    const spy = spyOn(component.stopped, 'emit').and.callThrough();
    component.stop();
    expect(spy).toHaveBeenCalled();
  });

  it('should increase the bpm value', () => {
    component.form.get('bpm').setValue(40);
    component.changeBpm(false);
    expect(component.form.get('bpm').value).toBe(40);

    component.form.get('bpm').setValue(250);
    component.changeBpm(true);
    expect(component.form.get('bpm').value).toBe(250);

    component.form.get('bpm').setValue(60);
    component.changeBpm(false);
    expect(component.form.get('bpm').value).toBe(59);

    component.form.get('bpm').setValue(60);
    component.changeBpm(true);
    expect(component.form.get('bpm').value).toBe(61);
  });
});

