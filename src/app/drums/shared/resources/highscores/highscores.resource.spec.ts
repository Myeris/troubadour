import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';
// app
import { HighscoresResource } from './highscores.resource';
import { HighscoresService } from '../../services/highscores/highscores.service';

class AfDbMock {
  list() {
    return {
      snapshotChanges: () => {
        return of({});
      }
    };
  }
}

describe('HighscoresResource', () => {
  let resource: HighscoresResource;
  let service: HighscoresService;
  let db: AngularFireDatabase;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        HighscoresResource,
        HighscoresService,
        { provide: AngularFireDatabase, useFactory: () => new AfDbMock() }
      ]
    });

    resource = bed.get(HighscoresResource);
    service = bed.get(HighscoresService);
    db = bed.get(AngularFireDatabase);
  });

  it('should be created', () => {
    expect(resource).toBeTruthy();
  });

  describe('getHighscoreList$', () => {
    it('should call the db.list', () => {
      spyOn(db, 'list').and.callThrough();
      spyOn(service, 'mapHighscoreListFromSnapshotAction').and.returnValue(true);

      resource.getHighscoreList$('uid');
      expect(db.list).toHaveBeenCalledTimes(1);

      resource.getHighscoreList$('uid').subscribe((x) => {
        expect(service.mapHighscoreListFromSnapshotAction).toHaveBeenCalledTimes(1);
      });
    });
  });
});
