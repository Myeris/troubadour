import {Injectable} from '@angular/core';
import {AngularFireDatabase, SnapshotAction} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
// app
import {PracticeSession} from '../../models/models/practice-session.model';

@Injectable()
export class PracticeSessionsResource {
  private colName = 'practice-sessions';

  constructor(private db: AngularFireDatabase) {
  }

  getSessionList$(uid: string): Observable<PracticeSession[]> {
    return this.db.list<PracticeSession>(`${this.colName}/${uid}`)
      .snapshotChanges()
      .pipe(
        map((actions: SnapshotAction<PracticeSession>[]) => {
          return  actions.map((a: SnapshotAction<PracticeSession>) => {
            const data = a.payload.val();
            const $key = a.payload.key;

            return {$key, ...data};
          });
        })
      );
  }
}
