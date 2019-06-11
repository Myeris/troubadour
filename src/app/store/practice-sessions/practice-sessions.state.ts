import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
// app
import { PracticeSession } from '../../drums/shared/models/practice-session.model';

export interface PracticeSessionsState extends EntityState<PracticeSession> {
  selectedId: string;
  isLoading: boolean;
  error: string;
}

export const practiceSessionsEntityAdapter: EntityAdapter<PracticeSession> = createEntityAdapter<
  PracticeSession
>({
  selectId: (session: PracticeSession) => session.$key
});

export const initialPracticeSessionState: PracticeSessionsState = practiceSessionsEntityAdapter.getInitialState(
  {
    selectedId: null,
    isLoading: false,
    error: null
  }
);
