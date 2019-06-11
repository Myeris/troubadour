import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';
// app
import { PracticeSessionsResource } from './practice-sessions.resource';
import { PracticeSessionsService } from '../../services/practice-sessions/practice-sessions.service';
import { PracticeSession } from '../../models/practice-session.model';
import { Exercise } from '../../models/exercise.model';

class AfDbMock {
  list() {
    return {
      snapshotChanges: () => of({}),
      remove: () => Promise.resolve(),
      push: () => Promise.resolve()
    };
  }

  object() {
    return {
      snapshotChanges: () => of({})
    };
  }
}

describe('PracticeSessionsResource', () => {
  let resource: PracticeSessionsResource;
  let service: PracticeSessionsService;
  let db: AngularFireDatabase;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        PracticeSessionsResource,
        { provide: AngularFireDatabase, useFactory: () => new AfDbMock() },
        PracticeSessionsService
      ]
    });

    resource = bed.get(PracticeSessionsResource);
    service = bed.get(PracticeSessionsService);
    db = bed.get(AngularFireDatabase);
  });

  it('should be created', () => {
    expect(resource).toBeTruthy();
  });

  describe('getSessionList$', () => {
    it('should call list', () => {
      spyOn(db, 'list').and.callThrough();
      spyOn(service, 'mapSessionListFromSnapshotAction').and.returnValue(true);

      resource.getSessionList$('uid');
      expect(db.list).toHaveBeenCalledTimes(1);

      resource.getSessionList$('uid').subscribe(() => {
        expect(service.mapSessionListFromSnapshotAction).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('getOneSession$', () => {
    it('should call an object', () => {
      spyOn(db, 'object').and.callThrough();
      spyOn(service, 'mapSessionFromSnapshotAction').and.returnValue(true);

      resource.getOneSession$('uid', 'id');
      expect(db.object).toHaveBeenCalledTimes(1);

      resource.getOneSession$('uid', 'id').subscribe(() => {
        expect(service.mapSessionFromSnapshotAction).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('removeSession', () => {
    it('should call list and remove', () => {
      spyOn(db, 'list').and.callThrough();

      resource.removeSession('uid', 'key');

      expect(db.list).toHaveBeenCalledTimes(1);
    });
  });

  describe('createSession', () => {
    it('should call list and create', () => {
      spyOn(db, 'list').and.callThrough();
      spyOn(resource as any, 'removeExercise').and.returnValue({});

      resource.createSession('uid', {} as PracticeSession);

      expect(db.list).toHaveBeenCalledTimes(1);
    });
  });

  describe('removeExercise', () => {
    it('should remove', () => {
      const session = {
        exercises: [
          {
            hand: 'R',
            tabRef: 'qwe',
            repeat: 1,
            tab: { name: 'name', type: 'type', drumkit: true, timeSignature: '4/4', notes: [] }
          },
          {
            hand: 'R',
            tabRef: 'qwe',
            repeat: 1,
            tab: { name: 'name', type: 'type', drumkit: true, timeSignature: '4/4', notes: [] }
          }
        ]
      };

      const newSession = (resource as any).removeExercise(session);
      const tabs = [];

      newSession.exercises.forEach((exercise: Exercise) => {
        if (exercise.tab) {
          tabs.push(exercise.tab);
        }
      });

      expect(tabs.length).toBe(0);
    });

    it('should throw an error', () => {
      expect(() => (resource as any).removeExercise({ exercises: [{}] })).toThrow(
        new Error('Missing tab ref')
      );
    });
  });
});
