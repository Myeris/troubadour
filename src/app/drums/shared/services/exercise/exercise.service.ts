import { Injectable } from '@angular/core';

@Injectable()
export class ExerciseService {
  public getExerciseDuration(timeSignature: string, repeat: number, bpm: number): number {
    const beatsPerMeasure = parseInt(timeSignature[0], 0);

    return ((beatsPerMeasure * repeat) / bpm) * 60;
  }
}
