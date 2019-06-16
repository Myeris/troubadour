import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
// app
import { Tag } from '../../drums/shared/models/tag.model';
import { Feedback } from 'src/app/shared/models/feedback.model';

export interface TypesState extends EntityState<Tag> {
  isLoading: boolean;
  feedback: Feedback;
}

export const typesEntityAdapter: EntityAdapter<Tag> = createEntityAdapter<Tag>({
  selectId: (type: Tag) => type.$key
});

export const initialTypesState: TypesState = typesEntityAdapter.getInitialState({
  isLoading: false,
  feedback: null
});
