import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
// app
import { Tab } from '../../drums/shared/models/tab.model';

export interface TabsState extends EntityState<Tab> {
  isLoading: boolean;
  error: string;
  selectedId: string;
}

export const tabsEntityAdapter: EntityAdapter<Tab> = createEntityAdapter<Tab>({
  selectId: (tab: Tab) => tab.$key
});

export const initialTabsState: TabsState = tabsEntityAdapter.getInitialState({
  isLoading: false,
  error: null,
  selectedId: null
});
