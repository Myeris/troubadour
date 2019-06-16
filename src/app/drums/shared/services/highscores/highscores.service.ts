import { Injectable } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
// app
import { Highscore } from '../../models/highscore.model';

@Injectable()
export class HighscoresService {
  public mapHighscoreListFromSnapshotAction(actions: SnapshotAction<Highscore>[]): Highscore[] {
    return actions.map((a: SnapshotAction<Highscore>) => {
      const data = a.payload.val();
      const $key = a.payload.key;

      return { $key, ...data };
    });
  }
}
