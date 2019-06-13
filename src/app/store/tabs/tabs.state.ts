import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
// app
import { Tab } from '../../drums/shared/models/tab.model';
import { Feedback } from 'src/app/shared/models/feedback.model';

export interface TabsState extends EntityState<Tab> {
  isLoading: boolean;
  selectedId: string;
  selectedType: string;
  feedback: Feedback;
}

export const tabsEntityAdapter: EntityAdapter<Tab> = createEntityAdapter<Tab>({
  selectId: (tab: Tab) => tab.$key
});

export const initialTabsState: TabsState = tabsEntityAdapter.getInitialState({
  isLoading: false,
  selectedId: null,
  selectedType: null,
  feedback: null
});
