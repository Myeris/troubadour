import { MetronomeSettings } from './metronome-settings.model';

export interface SoundOptions {
  playAlong?: boolean;
  metronomeOnly?: boolean;
  metronomeSettings?: MetronomeSettings;
}
