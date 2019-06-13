import { initialTabsState } from '../tabs.state';
import { tabsReducer } from './tabs.reducer';
import {
  TabListLoad,
  TabListLoadFail,
  TabListLoadSuccess,
  TabSelect,
  TabSelectType
} from '../actions/tabs.actions';
import { Tab } from '../../../drums/shared/models/tab.model';

const tabs: Tab[] = [
  {
    name: 'Single roll stroke',
    type: 'rolls',
    drumkit: false,
    timeSignature: '4/4',
    notes: [],
    $key: 'a'
  },
  {
    name: 'Double roll stroke',
    type: 'rolls',
    drumkit: false,
    timeSignature: '4/4',
    notes: [],
    $key: 'b'
  },
  { name: 'Flams', type: 'flams', drumkit: false, timeSignature: '4/4', notes: [], $key: 'c' }
];

describe('TabsReducer', () => {
  describe('undefined actions', () => {
    it('should return the default state', () => {
      const initialState = initialTabsState;
      const action = {};
      // @ts-ignore because I'm trying to fool the reducer by passing non sense but TS keeps crying
      const state = tabsReducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('ListLoad', () => {
    it('should set the state', () => {
      const action = new TabListLoad();
      const state = tabsReducer(initialTabsState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.feedback).toBeNull();
      expect(state.ids.length).toBe(0);
    });
  });

  describe('ListLoadSuccess', () => {
    it('should set the state', () => {
      const action = new TabListLoadSuccess({ tabList: tabs });
      const state = tabsReducer(initialTabsState, action);

      console.log(state.entities);

      expect(state.isLoading).toBeFalsy();
      expect(state.feedback).toBeNull();
      expect(Object.keys(state.entities).length).toBe(3);
    });
  });

  describe('ListLoadFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new TabListLoadFail({ error });
      const state = tabsReducer(initialTabsState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.ids.length).toBe(0);
      expect(state.feedback.success).toBeFalsy();
      expect(state.feedback.message).toBe(error);
    });
  });

  describe('Select', () => {
    it('should set the state', () => {
      const id = 'id';
      const action = new TabSelect({ id });
      const state = tabsReducer(initialTabsState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.feedback).toBeNull();
      expect(state.selectedId).toBe(id);
    });
  });

  describe('SelectType', () => {
    it('should set the state', () => {
      const type = 'type';
      const action = new TabSelectType({ type });
      const state = tabsReducer(initialTabsState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.feedback).toBeNull();
      expect(state.selectedType).toBe(type);
    });
  });
});
