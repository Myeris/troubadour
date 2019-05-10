import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Highscore } from '../../drums/shared/models/highscore.model';

export interface HighscoresState extends EntityState<Highscore> {
  selectedId: string;
  isLoading: boolean;
  error: string;
}

export const highscoresEntityAdapter: EntityAdapter<Highscore> = createEntityAdapter({
  selectId: (highscore: Highscore) => highscore.$key
});

export const initialHighscoresState: HighscoresState = highscoresEntityAdapter.getInitialState({
  selectedId: null,
  isLoading: false,
  error: null
});
