import {Pipe, PipeTransform} from '@angular/core';
// app
import {Exercise} from '../../models/exercise.model';
import {DurationPipe} from '../duration/duration.pipe';

@Pipe({
  name: 'options'
})
export class OptionsPipe extends DurationPipe implements PipeTransform {

  public transform(value: Exercise, ...args: any[]): string {
    let res = 'Undefined options exercises.';

    if (!value.hasOwnProperty('soundOptions')) {
      value.soundOptions = {playAlong: true};
    }

    if (value.bpmScale) {
      res = `From ${value.bpmScale.start} bpm to ${value.bpmScale.stop} bpm with a step of ${value.bpmScale.step}. Start with ${value.hand === 'L' ? 'left' : 'right'} hand. Duration: ${super.transform(value.duration)}. ${value.soundOptions.metronomeOnly ? 'Metronome only (' + value.soundOptions.metronomeSettings.subdivision + 'th)' : 'Play along'}.`;
    }

    if (value.bpm) {
      res = `${value.bpm} bpm. Start with ${value.hand === 'L' ? 'left' : 'right'} hand. Duration: ${super.transform(value.duration)}. ${value.soundOptions.metronomeOnly ? 'Metronome only' : 'Play along'}.`;
    }

    return res;
  }

}
