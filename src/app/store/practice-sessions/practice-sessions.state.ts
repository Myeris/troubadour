import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
// app
import { PracticeSession } from '../../drums/shared/models/practice-session.model';
import { Feedback } from 'src/app/shared/models/feedback.model';

export interface PracticeSessionsState extends EntityState<PracticeSession> {
  selectedId: string;
  isLoading: boolean;
  feedback: Feedback;
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
    feedback: null
  }
);
