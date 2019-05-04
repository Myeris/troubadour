import {Injectable} from '@angular/core';
import {SnapshotAction} from '@angular/fire/database';
// app
import {PracticeSession} from '../../models/practice-session.model';

@Injectable()
export class PracticeSessionsService {

  constructor() {
  }

  public mapSessionListFromSnapshotAction(actions: SnapshotAction<PracticeSession>[]): PracticeSession[] {
    return actions.map((a: SnapshotAction<PracticeSession>) => {
      const data = a.payload.val();
      const $key = a.payload.key;

      return {$key, ...data};
    });
  }
}
