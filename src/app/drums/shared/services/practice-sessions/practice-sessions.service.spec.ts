import {TestBed} from '@angular/core/testing';
// app
import {PracticeSessionsService} from './practice-sessions.service';
import {Exercise} from '../../models/exercise.model';

describe('PracticeSessionsService', () => {
  let service: PracticeSessionsService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [PracticeSessionsService]
    });

    service = bed.get(PracticeSessionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSessionDuration', () => {
    it('should be able to return a session duration', () => {
      let duration = service.getSessionDuration('4/4', 1, 60);
      expect(duration).toBe(4);

      duration = service.getSessionDuration('4/4', 60, 60);
      expect(duration).toBe(240);
    });
  });

  describe('doesSessionRequiresDrumkit', () => {
    it('should be able to tell if a session requires a drumkit or not', () => {
      const exercises: Exercise[] = [];
      exercises.push({
        hand: 'R',
        bpm: 60,
        repeat: 30,
        duration: 120,
        tabRef: 'tab',
        tab: {name: 'Ex1', type: 'rolls', drumkit: false, timeSignature: '4/4', notes: []}
      });
      exercises.push({
        hand: 'R',
        bpm: 60,
        repeat: 30,
        duration: 120,
        tabRef: 'tab',
        tab: {name: 'Ex1', type: 'rolls', drumkit: false, timeSignature: '4/4', notes: []}
      });
      expect(service.doesSessionRequiresDrumkit(exercises)).toBeFalsy();

      exercises.push({
        hand: 'R',
        bpm: 60,
        repeat: 30,
        duration: 120,
        tabRef: 'tab',
        tab: {name: 'Ex1', type: 'rolls', drumkit: true, timeSignature: '4/4', notes: []}
      });
      expect(service.doesSessionRequiresDrumkit(exercises)).toBeTruthy();
    });
  });
});
