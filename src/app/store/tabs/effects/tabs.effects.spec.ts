import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import SpyObj = jasmine.SpyObj;
import {of, throwError} from 'rxjs';
import {Actions} from '@ngrx/effects';
import {cold, hot} from 'jasmine-marbles';
// app
import {getActions, TestActions} from '../../../shared/utils/test-actions/test-actions.utils';
import {TabsResource} from '../../../drums/shared/resources/tabs/tabs.resource';
import {TabsEffects} from './tabs.effects';
import {AppState} from '../../app.reducer';
import {Tab} from '../../../drums/shared/models/tab.model';
import {TabListLoad, TabListLoadFail, TabListLoadSuccess} from '../actions/tabs.actions';
import {User} from '../../../auth/shared/models/user.model';

const tabs: Tab[] = [
  {name: 'Single roll stroke', type: 'rolls', drumkit: false, timeSignature: '4/4', notes: [], $key: 'a'},
  {name: 'Double roll stroke', type: 'rolls', drumkit: false, timeSignature: '4/4', notes: [], $key: 'b'},
  {name: 'Flams', type: 'flams', drumkit: false, timeSignature: '4/4', notes: [], $key: 'c'},
];

class TabsResourceMock {
  getTabList$() {}
}

describe('TabsEffects', () => {
  let actions$: TestActions;
  let tabsResource: TabsResource;
  let effects: TabsEffects;
  let store: SpyObj<Store<AppState>>;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        TabsEffects,
        {provide: TabsResource, useFactory: () => new TabsResourceMock()},
        {provide: Actions, useFactory: getActions},
        {provide: Store, useValue: jasmine.createSpyObj('store', ['select'])}
      ]
    });

    store = bed.get(Store);
    actions$ = bed.get(Actions);
    tabsResource = bed.get(TabsResource);
  });

  it('should be created', () => {
    effects = TestBed.get(TabsEffects);
    expect(effects).toBeTruthy();
  });

  describe('loadTabList$', () => {
    it('should return a success action', () => {
      spyOn(tabsResource, 'getTabList$').and.returnValue(of(tabs));

      const action = new TabListLoad();
      const completion = new TabListLoadSuccess({tabList: tabs});

      effects = TestBed.get(TabsEffects);

      actions$.stream = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});

      expect(effects.loadTabList$).toBeObservable(expected);
    });

    it('should return a fail action', () => {
      spyOn(tabsResource, 'getTabList$').and.callFake(() => throwError({message: 'error'}));

      const action = new TabListLoad();
      const completion = new TabListLoadFail({error: 'error'});

      effects = TestBed.get(TabsEffects);

      actions$.stream = hot('-a', {a: action});
      const expected = cold('-(c|)', {c: completion});

      expect(effects.loadTabList$).toBeObservable(expected);
    });
  });
});
