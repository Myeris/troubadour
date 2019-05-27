import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// app
import { MetronomeComponent } from './metronome.component';
import { MetronomeService } from '../../../shared/services/metronome/metronome.service';

class MockMetronome {
  init() {
  }

  playMetronome() {
  }

  stop() {
  }
}

describe('MetronomeComponent', () => {
  let component: MetronomeComponent;
  let fixture: ComponentFixture<MetronomeComponent>;
  let el: DebugElement;
  let metronome: MetronomeService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      declarations: [
        MetronomeComponent
      ],
      providers: [
        { provide: MetronomeService, useClass: MockMetronome }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = bed.createComponent(MetronomeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    metronome = bed.get(MetronomeService);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    expect(el.query(By.css('h1')).nativeElement.textContent).toContain('Metronome');
    expect(el.query(By.css('metronome-options'))).toBeDefined();
  });

  it('should start playing the metronome', () => {
    const form = {
      bpm: 100,
      beat: 4,
      note: 4,
      subdivision: 2,
      accents: [0]
    };
    const spy = spyOn(metronome, 'playMetronome').and.callThrough();
    component.onPlay(form);
    expect(spy).toHaveBeenCalledWith(form);
  });

  it('should stop playing the metronome', () => {
    const spy = spyOn(metronome, 'stop').and.callThrough();
    component.onStop();
    expect(spy).toHaveBeenCalled();
  });
});

