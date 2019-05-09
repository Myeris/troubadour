import { Injectable } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
// app
import { PracticeSession } from '../../models/practice-session.model';
import { Exercise } from '../../models/exercise.model';

@Injectable()
export class PracticeSessionsService {

  constructor() {
  }

  public mapSessionListFromSnapshotAction(actions: SnapshotAction<PracticeSession>[]): PracticeSession[] {
    return actions.map((a: SnapshotAction<PracticeSession>) => {
      const data = a.payload.val();
      const $key = a.payload.key;

      return { $key, ...data };
    });
  }

  public getSessionDuration(timeSignature: string, repeat: number, bpm: number): number {
    const beatsPerMeasure = parseInt(timeSignature[0], 16);

    return ((beatsPerMeasure * repeat) / bpm) * 60;
  }

  public doesSessionRequiresDrumkit(exercises: Exercise[]): number {
    return exercises.filter(exercise => exercise.tab.drumkit).length;
  }
}
