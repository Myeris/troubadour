import { TypesActionsTypes, TypesListLoad, TypesListLoadFail, TypesListLoadSuccess } from './types.actions';

describe('TypesAction', () => {
  describe('TypesListLoad', () => {
    it('should create an action', () => {
      const action = new TypesListLoad();
      expect(action.type).toBe(TypesActionsTypes.LoadList);
    });
  });

  describe('TypesListLoadSuccess', () => {
    it('should create an action', () => {
      const action = new TypesListLoadSuccess({ types: [] });
      expect(action.type).toBe(TypesActionsTypes.LoadListSuccess);
    });
  });

  describe('TypesListLoadFail', () => {
    it('should create an action', () => {
      const action = new TypesListLoadFail({ error: 'error' });
      expect(action.type).toBe(TypesActionsTypes.LoadListFail);
    });
  });
});
