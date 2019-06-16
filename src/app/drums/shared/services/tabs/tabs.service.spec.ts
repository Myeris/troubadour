import { TestBed } from '@angular/core/testing';
import { SnapshotAction } from '@angular/fire/database';
// app
import { TabsService } from './tabs.service';
import { Tab } from '../../models/tab.model';

describe('TabsService', () => {
  let service: TabsService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [TabsService]
    });

    service = bed.get(TabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('mapTabListFromSnapshotAction', () => {
    it('should return a list of tabs from snapshot actions', () => {
      expect(
        service.mapTabListFromSnapshotAction([
          {
            payload: {
              key: 'a',
              val(): Tab {
                return {
                  $key: 's'
                } as Tab;
              }
            }
          } as SnapshotAction<Tab>
        ]).length
      ).toBe(1);
    });
  });
});
