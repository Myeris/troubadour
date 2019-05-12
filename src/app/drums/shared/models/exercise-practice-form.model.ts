import { SoundOptions } from './sound-options.model';

export interface ExercisePracticeForm {
  bpmDuration?: { bpm: number; duration: number; };
  bpmScale?: { start: number; stop: number; step: number; repeat: number; };
  toFailure?: { bpm: number; step: number; };
  soundOptions?: SoundOptions;
}
