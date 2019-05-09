import {initialTypesState} from '../types.state';
import {typesReducer} from './types.reducer';
import {TypesListLoad, TypesListLoadFail, TypesListLoadSuccess} from '../actions/types.actions';
import {Tag} from '../../../drums/shared/models/tag.model';

describe('TypesReducer', () => {
  describe('undefined actions', () => {
    it('should return the default state', () => {
      const initialState = initialTypesState;
      const action = {};
      // @ts-ignore because I'm trying to fool the reducer by passing non sense but TS keeps crying
      const state = typesReducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('LoadList', () => {
    it('should set the state', () => {
      const action = new TypesListLoad();
      const state = typesReducer(initialTypesState, action);

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
      expect(state.ids.length).toBe(0);
    });
  });

  describe('LoadListFail', () => {
    it('should set the state', () => {
      const error = 'error';
      const action = new TypesListLoadFail({error});
      const state = typesReducer(initialTypesState, action);

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBe(error);
      expect(state.ids.length).toBe(0);
    });
  });

  describe('ListLoadSuccess', () => {
    it('should set the state', () => {
      const types: Tag[] = [{name: 'name', color: 'red'}];
      const action = new TypesListLoadSuccess({types});
      const state = typesReducer(initialTypesState, action);

      console.log(state.entities);

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(Object.keys(state.entities).length).toBe(1);
    });
  });
});
