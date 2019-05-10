import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
// app
import { ToFailureResultComponent } from './to-failure-result.component';

describe('ToFailureResultComponent', () => {
  let component: ToFailureResultComponent;
  let fixture: ComponentFixture<ToFailureResultComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        ToFailureResultComponent
      ],
      providers: [],
      imports: [
        FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = bed.createComponent(ToFailureResultComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    component.bpm = 150;
    component.newBpm = 150;
    fixture.detectChanges();

    expect(el.query(By.css('.to-failure-result__title')).nativeElement.textContent).toContain('Road to failure');
    expect(el.query(By.css('.to-failure-result__content > p')).nativeElement.textContent).toContain('You failed at 150bpm!');
    expect(el.query(By.css('.to-failure-result__content > label')).nativeElement.textContent).toContain('Adjust your score');
    expect(el.queryAll(By.css('button'))[0].nativeElement.textContent).toContain('Save your high score');
    expect(el.queryAll(By.css('button'))[1].nativeElement.textContent).toContain('Cancel');
  });

  it('should emit an event to save the highscore', () => {
    const spy = spyOn(component.highscored, 'emit').and.callThrough();
    component.bpm = 150;
    component.newBpm = 150;

    component.saveHighscore();
    expect(component.feedback).toBeNull();
    expect(spy).toHaveBeenCalled();
  });

  it('should set a feedback if newBpm > bpm', () => {
    component.bpm = 150;
    component.newBpm = 160;

    component.saveHighscore();
    expect(component.feedback).toBe('Oh come one... No one likes a cheater.');
  });

  it('should emit a cancel event', () => {
    const spy = spyOn(component.cancelled, 'emit').and.callThrough();
    component.cancel();
    expect(spy).toHaveBeenCalled();
  });
});
