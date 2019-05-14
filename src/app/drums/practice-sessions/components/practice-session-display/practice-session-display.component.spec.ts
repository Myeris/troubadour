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
  initVexflow() {
  }
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

    component.session = session;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    expect(el.query(By.css('.duration')).nativeElement.textContent).toContain('1 minute');
    expect(el.query(By.css('.repeat')).nativeElement.textContent).toContain('1 times');
    expect(el.query(By.css('.drumkit')).nativeElement.textContent).toContain('No drumkit required');
    expect(el.query(By.css('.exercises')).nativeElement.textContent).toContain(`${session.exercises.length} exercises`);
    expect(el.query(By.css('h4')).nativeElement.textContent).toContain(`Exercise #1 - ${session.exercises[0].tab.name}`);
    expect(el.query(By.css('tab-display'))).toBeDefined();
  });

  describe('ngOnChanges', () => {
    it('should call assignTab', () => {
      spyOn((component as any), 'assignTab').and.callFake(() => true);

      component.ngOnChanges();
      expect((component as any).assignTab).toHaveBeenCalledTimes(1);
    });
  });

  describe('play', () => {
    beforeEach(() => {
      spyOn(component, 'stop').and.callFake(() => true);
      spyOn(component, 'scrollIntoView').and.callFake(() => true);
      spyOn(metronome, 'playExercise').and.callFake(() => true);
      spyOn((component as any), 'reset').and.callFake(() => true);
    });

    it('should stop the exercise if state is running', () => {
      component.state = 'running';
      component.play();
      expect(component.stop).toHaveBeenCalledTimes(1);
    });

    it('should play the exercise', () => {
      component.session = session;
      component.tabs = tabs;
      fixture.detectChanges();

      component.play();
      expect(component.scrollIntoView).toHaveBeenCalled();
      expect(metronome.playExercise).toHaveBeenCalled();
    });
  });

  describe('playPause', () => {
    it('should play/pause the exercise', () => {
      const playSpy = spyOn(component, 'play').and.callThrough();
      const resumeSpy = spyOn(metronome, 'resume').and.callThrough();
      const pauseSpy = spyOn(metronome, 'pause').and.callThrough();

      component.state = 'running';
      component.playPause();
      expect(pauseSpy).toHaveBeenCalled();

      component.state = 'suspended';
      component.playPause();
      expect(resumeSpy).toHaveBeenCalled();

      component.state = 'stopped';
      component.playPause();
      expect(playSpy).toHaveBeenCalled();
    });

    it('should handle no state', () => {
      const playSpy = spyOn(component, 'play').and.callThrough();
      const resumeSpy = spyOn(metronome, 'resume').and.callThrough();
      const pauseSpy = spyOn(metronome, 'pause').and.callThrough();

      component.state = '';
      expect(pauseSpy).not.toHaveBeenCalled();
      expect(resumeSpy).not.toHaveBeenCalled();
      expect(playSpy).not.toHaveBeenCalled();
    });
  });

  describe('stop', () => {
    it('should stop the exercise', () => {
      const stopSpy = spyOn(metronome, 'stop');

      component.stop();
      expect(stopSpy).toHaveBeenCalled();
    });
  });

  describe('playNext', () => {
    beforeEach(() => {
      spyOn(component, 'stop').and.callFake(() => Promise.resolve(true));
      spyOn(component, 'play').and.callFake(() => Promise.resolve(true));
      spyOn(component, 'scrollIntoView').and.callFake(() => Promise.resolve(true));
    });

    it('should do nothing if exercise is the last', () => {
      component.state = 'running';
      component.playNext();
      expect(component.stop).toHaveBeenCalled();
      expect(component.play).not.toHaveBeenCalled();
      expect(component.scrollIntoView).not.toHaveBeenCalled();
    });

    it('should call play if exercise is already playing', () => {
      // TODO
    });

    it('should just scrollIntoView if exercise is not playing', () => {
      // TODO
    });
  });

  describe('playPrevious', () => {
    beforeEach(() => {
      spyOn(component, 'stop').and.callFake(() => Promise.resolve(true));
      spyOn(component, 'play').and.callFake(() => Promise.resolve(true));
      spyOn(component, 'scrollIntoView').and.callFake(() => Promise.resolve(true));
    });

    it('should do nothing if exercise is the last', () => {
      component.state = 'running';
      component.playPrevious();
      expect(component.stop).toHaveBeenCalled();
      expect(component.play).not.toHaveBeenCalled();
      expect(component.scrollIntoView).not.toHaveBeenCalled();
    });

    it('should call play if exercise is already playing', () => {
      // TODO
    });

    it('should just scrollIntoView if exercise is not playing', () => {
      // TODO
    });
  });

  describe('changeVolume', () => {
    it('should call the volume change method', () => {
      const spy = spyOn(metronome, 'changeVolume').and.callThrough();
      component.changeVolume({});
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('reset', () => {
    it('should reset the properties', () => {
      spyOn(component, 'scrollIntoView').and.callFake(() => true);
      (component as any).reset();
      expect(component.state).toBe('stopped');
      expect(component.inPlayIndex).toBe(0);
      expect(component.playTime).toBe(0);
      expect(component.scrollIntoView).toHaveBeenCalledTimes(1);
    });
  });
});
