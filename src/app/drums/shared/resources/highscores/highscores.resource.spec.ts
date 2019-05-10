import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
// app
import { HighscoresResource } from './highscores.resource';
import { HighscoresService } from '../../services/highscores/highscores.service';

class AfDbMock {
  list() {
    return {
      snapshotChanges: () => {
      }
    };
  }
}

describe('HighscoresResource', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HighscoresResource,
      HighscoresService,
      { provide: AngularFireDatabase, useFactory: () => new AfDbMock() }
    ]
  }));

  it('should be created', () => {
    const service: HighscoresResource = TestBed.get(HighscoresResource);
    expect(service).toBeTruthy();
  });
});
