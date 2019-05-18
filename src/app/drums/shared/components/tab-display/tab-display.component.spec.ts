import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
// app
import { TabDisplayComponent } from './tab-display.component';
import { Tab } from '../../models/tab.model';
import { Exercise } from '../../models/exercise.model';
import { VexflowService } from '../../services/vexflow/vexflow.service';
import SpyObj = jasmine.SpyObj;

const tabs: Tab[] = [
  { name: 'Tab 1', type: 'rolls', drumkit: false, timeSignature: '4/4', notes: [], $key: '1' },
  {
    name: 'Tab 2',
    type: 'rolls',
    drumkit: false,
    timeSignature: '4/4',
    notes: [
      { keys: ['c'], duration: '10' }
    ],
    $key: '2'
  },
  { name: 'Tab 3', type: 'flams', drumkit: false, timeSignature: '4/4', notes: [], $key: '3' }
];

const exercise: Exercise = {
  hand: 'R',
  bpm: 60,
  duration: 60,
  tab: tabs[1],
  tabRef: tabs[1].$key,
  repeat: 1,
  soundOptions: {
    metronomeOnly: false,
    playAlong: true
  }
};

describe('TabDisplayComponent', () => {
  let component: TabDisplayComponent;
  let fixture: ComponentFixture<TabDisplayComponent>;
  let vexflowService: SpyObj<VexflowService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabDisplayComponent],
      providers: [
        {
          provide: VexflowService, useValue: jasmine.createSpyObj<VexflowService>('vexflowService',
            [
              'initVexflow',
              'createStave',
              'createNote',
              'createTies',
              'createBeams',
              'generateBeams',
              'createTriplets',
              'formatAndDraw',
              'drawBeams',
              'drawTuplets',
              'drawTies'
            ]
          )
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDisplayComponent);
    component = fixture.componentInstance;
    vexflowService = TestBed.get(VexflowService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should do nothing', () => {
      spyOn((component as any), 'createStave').and.callFake(() => true);
      component.ngOnChanges({});
      expect((component as any).createStave).not.toHaveBeenCalled();
    });

    it('should call createStave', fakeAsync(() => {
      spyOn((component as any), 'createStave').and.callFake(() => true);
      component.exercise = {
        tab: {} as Tab
      } as Exercise;
      component.ngOnChanges({});
      tick(1000);
      expect((component as any).createStave).toHaveBeenCalledTimes(1);
    }));
  });

  describe('createStave', () => {
    it('should throw an error', fakeAsync(() => {
      vexflowService.initVexflow.and.returnValue(Promise.reject('error'));
      (component as any).createStave().catch((err) => expect(err).toEqual(new Error('error')));
      expect(vexflowService.initVexflow).toHaveBeenCalledTimes(1);
    }));

    it('should init vexflow', fakeAsync(() => {
      spyOn((component as any), 'drawStave').and.callFake(() => true);
      vexflowService.initVexflow.and.returnValue(Promise.resolve());
      (component as any).createStave();
      tick(100);
      expect(vexflowService.initVexflow).toHaveBeenCalledTimes(1);
      expect((component as any).drawStave).toHaveBeenCalledTimes(1);
    }));
  });

  describe('drawStave', () => {
    beforeEach(() => {
      component.exercise = { ...exercise };
    });

    it('should create stave', () => {
      vexflowService.createStave.and.callFake(() => true);
      vexflowService.generateBeams.and.callFake(() => []);
      vexflowService.createTies.and.callFake(() => []);
      (component as any).drawStave();
      expect(vexflowService.createStave).toHaveBeenCalledTimes(1);
      expect(vexflowService.generateBeams).toHaveBeenCalledTimes(1);
      expect(vexflowService.formatAndDraw).toHaveBeenCalledTimes(1);
    });

    it('should generate beams', () => {
      vexflowService.createStave.and.callFake(() => true);
      vexflowService.createNote.and.callFake(() => true);
      vexflowService.generateBeams.and.callFake(() => []);
      vexflowService.createTies.and.callFake(() => []);

      (component as any).drawStave();
      expect(vexflowService.generateBeams).toHaveBeenCalledTimes(1);
      expect(vexflowService.drawBeams).not.toHaveBeenCalled();
    });

    it('should create beams', () => {
      vexflowService.createStave.and.callFake(() => true);
      vexflowService.createNote.and.callFake(() => []);
      vexflowService.createBeams.and.callFake(() => [
        {}, {}
      ]);
      vexflowService.createTies.and.callFake(() => []);

      component.exercise.tab.notes = [
        { keys: ['c'], duration: '10', beamIndex: 1 },
        { keys: ['c'], duration: '10', beamIndex: 1 }
      ];

      (component as any).drawStave();
      expect(vexflowService.createBeams).toHaveBeenCalledTimes(1);
      expect(vexflowService.drawBeams).toHaveBeenCalledTimes(1);
    });

    it('should create triplets', () => {
      vexflowService.createStave.and.callFake(() => true);
      vexflowService.generateBeams.and.callFake(() => []);
      vexflowService.createTies.and.callFake(() => []);
      vexflowService.drawTuplets.and.callFake(() => []);

      component.exercise.tab.notes = [
        { keys: ['c'], duration: '10', triplet: true },
        { keys: ['c'], duration: '10', triplet: true }
      ];

      (component as any).drawStave();
      expect(vexflowService.drawTuplets).toHaveBeenCalledTimes(1);
    });

    it('should format and draw', () => {
      vexflowService.createStave.and.callFake(() => true);
      vexflowService.generateBeams.and.callFake(() => []);
      vexflowService.createTies.and.callFake(() => []);
      (component as any).drawStave();
      expect(vexflowService.formatAndDraw).toHaveBeenCalledTimes(1);
    });

    it('should draw ties', () => {
      vexflowService.createStave.and.callFake(() => true);
      vexflowService.generateBeams.and.callFake(() => []);
      vexflowService.createTies.and.callFake(() => [{}, {}]);
      vexflowService.drawTies.and.callFake(() => []);

      component.exercise.tab.notes = [
        { keys: ['c'], duration: '10', tieIndex: 1 },
        { keys: ['c'], duration: '10', tieIndex: 1 }
      ];

      (component as any).drawStave();
      expect(vexflowService.drawTies).toHaveBeenCalledTimes(1);
    });
  });
});
