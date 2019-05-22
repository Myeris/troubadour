import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// app
import { Highscore } from '../../models/highscore.model';
import { HighscoresService } from '../../services/highscores/highscores.service';

@Injectable({
  providedIn: 'root'
})
export class HighscoresResource {
  private colName = 'highscores';

  constructor(private db: AngularFireDatabase,
              private highscoresService: HighscoresService) {
  }

  public getHighscoreList$(uid: string): Observable<Highscore[]> {
    return this.db.list<Highscore>(`${this.colName}/${uid}`)
      .snapshotChanges()
      .pipe(map((actions: SnapshotAction<Highscore>[]) => this.highscoresService.mapHighscoreListFromSnapshotAction(actions)));
  }

  public saveHighscore(uid: string, highscore: Highscore): Promise<void> {
    const key = highscore.$key;
    delete (highscore.$key);

    return this.db.object(`${this.colName}/${uid}/${key}`)
      .update(highscore);
  }
}
