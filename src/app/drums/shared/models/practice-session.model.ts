import { Exercise } from './exercise.model';

export interface PracticeSession {
  name: string;
  exercises: Exercise[];
  repeat: number;
  created: number;
  updated: number;
  shared: boolean;
  drumkit: boolean;
  duration?: number;
  $key?: string;
  $exist?: () => boolean;
}
