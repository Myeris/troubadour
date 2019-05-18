import { TestBed } from '@angular/core/testing';
import { SnapshotAction } from '@angular/fire/database';
// app
import { HighscoresService } from './highscores.service';
import { Highscore } from '../../models/highscore.model';

describe('HighscoresService', () => {
  let service: HighscoresService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [HighscoresService]
    });

    service = bed.get(HighscoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('mapHighscoreListFromSnapshotAction', () => {
    it('should return a list of highscore from snapshot actions', () => {
      expect(service.mapHighscoreListFromSnapshotAction([
        {
          payload: {
            key: 'qwerty', val(): Highscore {
              return { $key: 'q', highscore: 4, date: 12, name: 'name' };
            }
          }
        } as SnapshotAction<Highscore>
      ]).length).toBe(1);
    });
  });
});
