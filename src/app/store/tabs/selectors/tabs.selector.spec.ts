import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
// app
import { appReducers, AppState } from '../../app.reducer';
import {
  getError,
  getSelectedTab,
  getTabsBySelectedType,
  isLoading,
  getFeedback
} from './tabs.selector';
import {
  TabListLoad,
  TabListLoadFail,
  TabListLoadSuccess,
  TabSelect,
  TabSelectType
} from '../actions/tabs.actions';
import { Tab } from '../../../drums/shared/models/tab.model';
import { Feedback } from 'src/app/shared/models/feedback.model';

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

describe('TabsSelectors', () => {
  let store: Store<AppState>;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducers)]
    });

    store = bed.get(Store);
  });

  describe('isLoading', () => {
    it('should return the isLoading prop from the state', () => {
      let result = false;

      store.select(isLoading).subscribe(value => (result = value));

      expect(result).toBeFalsy();

      store.dispatch(new TabListLoad());
      expect(result).toBeTruthy();

      store.dispatch(new TabListLoadFail({ error: 'error' }));
      expect(result).toBeFalsy();

      store.dispatch(new TabListLoad());
      expect(result).toBeTruthy();

      store.dispatch(new TabListLoadSuccess({ tabList: [] }));
      expect(result).toBeFalsy();
    });
  });

  describe('getError', () => {
    it('should return the error message', () => {
      const error = 'error';
      let result = null;

      store.select(getError).subscribe(value => (result = value));

      expect(result).toBeNull();

      store.dispatch(new TabListLoadFail({ error }));
      expect(result).toBe(error);

      store.dispatch(new TabListLoad());
      expect(result).toBeNull();

      store.dispatch(new TabListLoadFail({ error }));
      expect(result).toBe(error);

      store.dispatch(new TabListLoadSuccess({ tabList: [] }));
      expect(result).toBeNull();
    });
  });

  describe('getSelectedTab', () => {
    it('should return the selectedTab', () => {
      const id = 'a';
      let result = null;

      store.select(getSelectedTab).subscribe(value => (result = value));

      expect(result).toBeNull();
      store.dispatch(new TabListLoadSuccess({ tabList: tabs }));

      store.dispatch(new TabSelect({ id }));
      expect(result).toEqual(tabs[0]);
    });
  });

  describe('getTabsBySelectedType', () => {
    it('should return the tabs by type', () => {
      const type = 'rolls';
      let result = null;

      store.select(getTabsBySelectedType).subscribe(value => (result = value));

      expect(result).toBeNull();
      store.dispatch(new TabListLoadSuccess({ tabList: tabs }));

      store.dispatch(new TabSelectType({ type }));
      expect(result.length).toBe(2);
    });
  });

  describe('getFeedback', () => {
    it('should return the feedback', () => {
      const message = 'message';
      const feedback: Feedback = { success: false, message };
      let result = null;

      store.select(getFeedback).subscribe(value => (result = value));

      expect(result).toBeNull();
      store.dispatch(new TabListLoadFail({ error: message }));

      expect(result).toEqual(feedback);
    });
  });
});
