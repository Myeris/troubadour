import {cold, hot} from 'jasmine-marbles';
import {TestBed} from '@angular/core/testing';
import {Actions} from '@ngrx/effects';
import {of, throwError} from 'rxjs';
// app
import {getActions, TestActions} from '../../../shared/utils/test-actions/test-actions.utils';
import {TypesResource} from '../../../drums/shared/resources/types/types.resource';
import {TypesEffects} from './types.effects';
import {TypesListLoad, TypesListLoadFail, TypesListLoadSuccess} from '../actions/types.actions';
import {Tag} from '../../../drums/shared/models/tag.model';

class TypesResourceMock {
  getTypeList$() {
  }
}

describe('TypesEffects', () => {
  let actions$: TestActions;
  let resource: TypesResource;
  let effects: TypesEffects;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        TypesEffects,
        {provide: TypesResource, useClass: TypesResourceMock},
        {provide: Actions, useFactory: getActions}
      ]
    });

    actions$ = bed.get(Actions);
    resource = bed.get(TypesResource);
    effects = bed.get(TypesEffects);
  });

  describe('loadList$', () => {
    it('should return a success action', () => {
      const types: Tag[] = [{name: 'name', color: 'red'}];
      spyOn(resource, 'getTypeList$').and.returnValue(of(types));

      const action = new TypesListLoad();
      const completion = new TypesListLoadSuccess({types});

      actions$.stream = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});

      expect(effects.loadList$).toBeObservable(expected);
    });

    it('should return a a fail action', () => {
      const error = 'error';
      spyOn(resource, 'getTypeList$').and.callFake(() => throwError({message: error}));

      const action = new TypesListLoad();
      const completion = new TypesListLoadFail({error});

      actions$.stream = hot('-a', {a: action});
      const expected = cold('-(c|)', {c: completion});

      expect(effects.loadList$).toBeObservable(expected);
    });
  });
});
