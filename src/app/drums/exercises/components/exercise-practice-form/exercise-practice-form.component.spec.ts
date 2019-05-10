import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
// app
import { ExercisePracticeFormComponent } from './exercise-practice-form.component';
import { SharedModule } from '../../../shared/shared.module';

describe('ExercisePracticeForm', () => {
  let component: ExercisePracticeFormComponent;
  let fixture: ComponentFixture<ExercisePracticeFormComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        ExercisePracticeFormComponent
      ],
      imports: [
        SharedModule.forRoot()
      ]
    });

    fixture = bed.createComponent(ExercisePracticeFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    expect(el.query(By.css('.exercise-practice-form__title')).nativeElement.textContent).toContain('Practice this exercise');

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

  it('should emit an event on form submit', () => {
    const spy = spyOn(component.submitted, 'emit');
    component.submit();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit an event on form cancel', () => {
    const spy = spyOn(component.cancelled, 'emit');
    component.cancel();
    expect(spy).toHaveBeenCalled();
  });
});
