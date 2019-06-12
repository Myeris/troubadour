import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
// app
import { Highscore } from '../../drums/shared/models/highscore.model';
import { Feedback } from 'src/app/shared/models/feedback.model';

export interface HighscoresState extends EntityState<Highscore> {
  selectedId: string;
  isLoading: boolean;
  error: string; // TODO remove
  feedback: Feedback;
}

export const highscoresEntityAdapter: EntityAdapter<Highscore> = createEntityAdapter({
  selectId: (highscore: Highscore) => highscore.$key
});

export const initialHighscoresState: HighscoresState = highscoresEntityAdapter.getInitialState({
  selectedId: null,
  isLoading: false,
  error: null,
  feedback: null
});
