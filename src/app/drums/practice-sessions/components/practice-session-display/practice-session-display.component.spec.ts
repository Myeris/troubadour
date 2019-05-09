import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
// app
import { PracticeSessionDisplayComponent } from './practice-session-display.component';
import { SharedModule } from '../../../shared/shared.module';
import { PracticeSession } from '../../../shared/models/practice-session.model';
import { MetronomeService } from '../../../shared/services/metronome/metronome.service';
import { Tab } from '../../../shared/models/tab.model';
import { VexflowService } from '../../../shared/services/vexflow/vexflow.service';

const tabs: Tab[] = [
  {
    name: 'Single stroke rolls',
    type: 'rolls',
    drumkit: false,
    timeSignature: '4/4',
    notes: [
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] }
    ],
    $key: '1',
    $exist: () => true
  },
  {
    name: 'Double stroke rolls',
    type: 'rolls',
    drumkit: false,
    timeSignature: '4/4',
    notes: [
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] },
      { annotation: 'R', duration: '16', keys: ['c/5'] },
      { annotation: 'L', duration: '16', keys: ['c/5'] }
    ],
    $key: '2',
    $exist: () => true
  }
];
const session: PracticeSession = {
  name: 'Session1',
  exercises: [
    { hand: 'R', bpm: 60, duration: 60, tabRef: '1', tab: tabs[0], repeat: 1 }
  ],
  repeat: 1,
  created: new Date().valueOf(),
  updated: new Date().valueOf(),
  shared: false,
  drumkit: false,
  duration: 60,
  $key: '1',
  $exist: () => true
};

class MetronomeServiceMock {
  init() {
  }

  playExercise() {
  }

  resume() {
  }

  pause() {
  }

  stop() {
  }

  changeVolume() {
  }
}

class VexflowServiceMock {
}

describe('PracticeSessionDisplayComponent', () => {
  let component: PracticeSessionDisplayComponent;
  let fixture: ComponentFixture<PracticeSessionDisplayComponent>;
  let el: DebugElement;
  let metronome: MetronomeService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        PracticeSessionDisplayComponent
      ],
      providers: [
        { provide: MetronomeService, useClass: MetronomeServiceMock },
        { provide: VexflowService, useClass: VexflowServiceMock }
      ],
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = bed.createComponent(PracticeSessionDisplayComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    metronome = bed.get(MetronomeService);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    component.session = session;
    fixture.detectChanges();

    expect(el.query(By.css('.duration')).nativeElement.textContent).toContain('1 minute');
    expect(el.query(By.css('.repeat')).nativeElement.textContent).toContain('1 times');
    expect(el.query(By.css('.drumkit')).nativeElement.textContent).toContain('No drumkit required');
    expect(el.query(By.css('.exercises')).nativeElement.textContent).toContain(`${session.exercises.length} exercises`);
    expect(el.query(By.css('h4')).nativeElement.textContent).toContain(`Exercise #1 - ${session.exercises[0].tab.name}`);
    expect(el.query(By.css('tab-display'))).toBeDefined();
  });

  it('should play the exercise', () => {
    component.session = session;
    component.tabs = tabs;
    fixture.detectChanges();

    const scrollSpy = spyOn(component, 'scrollIntoView').and.callThrough();
    const playSpy = spyOn(metronome, 'playExercise').and.callThrough();

    component.play();
    expect(scrollSpy).toHaveBeenCalled();
    expect(playSpy).toHaveBeenCalled();
  });

  it('should play/pause the exercise', () => {
    const resumeSpy = spyOn(metronome, 'resume').and.callThrough();
    const pauseSpy = spyOn(metronome, 'pause').and.callThrough();

    component.state = 'running';
    component.playPause();
    expect(pauseSpy).toHaveBeenCalled();

    component.state = 'suspended';
    component.playPause();
    expect(resumeSpy).toHaveBeenCalled();
  });

  it('should stop the exercise', () => {
    const stopSpy = spyOn(metronome, 'stop');

    component.stop();
    expect(stopSpy).toHaveBeenCalled();
  });

  it('should call the volume change method', () => {
    const spy = spyOn(metronome, 'changeVolume').and.callThrough();
    component.changeVolume({});
    expect(spy).toHaveBeenCalled();
  });
});
