import {BpmScale} from './bpm-scale.model';
import {Tag} from './tag.model';
import {Tab} from './tab.model';
import {SoundOptions} from './sound-options.model';

export interface Exercise {
  hand: string;
  bpm?: number;
  duration?: number;
  bpmScale?: BpmScale;
  tab?: Tab;
  tabRef: string;
  repeat: number;
  level?: Tag;
  tags?: Tag[];
  soundOptions?: SoundOptions;
  $exist?: () => boolean;
}
