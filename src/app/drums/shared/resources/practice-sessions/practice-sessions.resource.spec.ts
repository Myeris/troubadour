import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
// app
import { PracticeSessionsResource } from './practice-sessions.resource';
import { PracticeSessionsService } from '../../services/practice-sessions/practice-sessions.service';

class AfDbMock {
  list() {
    return {
      snapshotChanges: () => {
      }
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
});
