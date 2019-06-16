import { Note } from './note.model';
import { Tag } from './tag.model';

export interface Tab {
  name: string;
  type: string;
  typeObject?: Tag;
  drumkit: boolean;
  timeSignature: string;
  notes: Note[];
  $key?: string;
  $exist?: () => boolean;
}
