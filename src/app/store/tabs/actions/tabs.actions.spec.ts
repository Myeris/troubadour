import {
  TabListLoad,
  TabListLoadFail,
  TabListLoadSuccess,
  TabsActionsTypes,
  TabSelect,
  TabSelectType
} from './tabs.actions';

describe('TabsActions', () => {
  describe('TabListLoad', () => {
    it('should create an action', () => {
      const action = new TabListLoad();
      expect(action.type).toBe(TabsActionsTypes.LoadList);
    });
  });

  describe('TabListLoadSuccess', () => {
    it('should create an action', () => {
      const action = new TabListLoadSuccess({ tabList: [] });
      expect(action.type).toBe(TabsActionsTypes.LoadListSuccess);
    });
  });

  describe('TabListLoadFail', () => {
    it('should create an action', () => {
      const action = new TabListLoadFail({ error: 'error' });
      expect(action.type).toBe(TabsActionsTypes.LoadListFail);
    });
  });

  describe('TabSelect', () => {
    it('should create an action', () => {
      const action = new TabSelect({ id: 'id' });
      expect(action.type).toBe(TabsActionsTypes.Select);
    });
  });

  describe('TabSelectType', () => {
    it('should create an action', () => {
      const action = new TabSelectType({ type: 'type' });
      expect(action.type).toBe(TabsActionsTypes.SelectType);
    });
  });
});
