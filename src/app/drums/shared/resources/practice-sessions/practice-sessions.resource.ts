import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// app
import { Exercise } from '../../models/exercise.model';
import { PracticeSession } from '../../models/practice-session.model';
import { PracticeSessionsService } from '../../services/practice-sessions/practice-sessions.service';
import ThenableReference = firebase.database.ThenableReference;

@Injectable()
export class PracticeSessionsResource {
  private colName = 'practice-sessions';

  constructor(
    private db: AngularFireDatabase,
    private practiceSessionsService: PracticeSessionsService
  ) {}

  public getSessionList$(uid: string): Observable<PracticeSession[]> {
    return this.db
      .list<PracticeSession>(`${this.colName}/${uid}`)
      .snapshotChanges()
      .pipe(
        map((actions: SnapshotAction<PracticeSession>[]) =>
          this.practiceSessionsService.mapSessionListFromSnapshotAction(actions)
        )
      );
  }

  public getOneSession$(uid: string, key: string): Observable<PracticeSession> {
    return this.db
      .object<PracticeSession>(`${this.colName}/${uid}/${key}`)
      .snapshotChanges()
      .pipe(
        map((action: SnapshotAction<PracticeSession>) =>
          this.practiceSessionsService.mapSessionFromSnapshotAction(action)
        )
      );
  }

  public removeSession(uid: string, key: string): Promise<void> {
    return this.db.list(`${this.colName}/${uid}`).remove(key);
  }

  public createSession(uid: string, practiceSession: PracticeSession): ThenableReference {
    practiceSession = this.removeExercise(practiceSession);

    return this.db.list(`${this.colName}/${uid}`).push(practiceSession);
  }

  public updateSession(uid: string, practiceSession: PracticeSession): Promise<void> {
    practiceSession = this.removeExercise(practiceSession);
    const $key = practiceSession.$key;
    delete practiceSession.$key;

    return this.db.object(`${this.colName}/${uid}/${$key}`).update(practiceSession);
  }

  private removeExercise(session: PracticeSession): PracticeSession {
    session.exercises.forEach((exercise: Exercise) => {
      if (!exercise.tabRef) {
        throw new Error('Missing tab ref');
      }

      delete exercise.tab;
    });

    return session;
  }
}
