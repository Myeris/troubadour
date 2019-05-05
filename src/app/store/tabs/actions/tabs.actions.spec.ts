import {TabListLoad, TabListLoadFail, TabListLoadSuccess, TabsActionsTypes} from './tabs.actions';

describe('TabsActions', () => {
  describe('TabListLoad', () => {
    it('should create an action', () => {
      const action = new TabListLoad();
      expect(action.type).toBe(TabsActionsTypes.LoadList);
    });
  });

  describe('TabListLoadSuccess', () => {
    it('should create an action', () => {
      const action = new TabListLoadSuccess({tabList: []});
      expect(action.type).toBe(TabsActionsTypes.LoadListSuccess);
    });
  });

  describe('TabListLoadFail', () => {
    it('should create an action', () => {
      const action = new TabListLoadFail({error: 'error'});
      expect(action.type).toBe(TabsActionsTypes.LoadListFail);
    });
  });
});
