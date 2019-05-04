import {Injectable} from '@angular/core';
import {AngularFireDatabase, SnapshotAction} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
// app
import {PracticeSession} from '../../models/practice-session.model';
import {PracticeSessionsService} from '../../services/practice-sessions/practice-sessions.service';

@Injectable()
export class PracticeSessionsResource {
  private colName = 'practice-sessions';

  constructor(private db: AngularFireDatabase,
              private practiceSessionsService: PracticeSessionsService) {
  }

  getSessionList$(uid: string): Observable<PracticeSession[]> {
    return this.db.list<PracticeSession>(`${this.colName}/${uid}`)
      .snapshotChanges()
      .pipe(map((actions: SnapshotAction<PracticeSession>[]) => this.practiceSessionsService.mapSessionListFromSnapshotAction(actions)));
  }

  removeSession(uid: string, key: string): Promise<void> {
    return this.db.list(`${this.colName}/${uid}`)
      .remove(key);
  }
}
