import { Injectable } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
// app
import { PracticeSession } from '../../models/practice-session.model';
import { Exercise } from '../../models/exercise.model';

@Injectable()
export class PracticeSessionsService {
  public mapSessionListFromSnapshotAction(
    actions: SnapshotAction<PracticeSession>[]
  ): PracticeSession[] {
    return actions.map((a: SnapshotAction<PracticeSession>) =>
      this.mapSessionFromSnapshotAction(a)
    );
  }

  public mapSessionFromSnapshotAction(action: SnapshotAction<PracticeSession>): PracticeSession {
    const data = action.payload.val();
    const $key = action.payload.key;
    return { $key, ...data };
  }

  public getSessionDuration(timeSignature: string, repeat: number, bpm: number): number {
    const beatsPerMeasure = parseInt(timeSignature[0], 0);

    return ((beatsPerMeasure * repeat) / bpm) * 60;
  }

  public doesSessionRequiresDrumkit(exercises: Exercise[]): number {
    return exercises.filter(exercise => exercise.tab.drumkit).length;
  }
}
