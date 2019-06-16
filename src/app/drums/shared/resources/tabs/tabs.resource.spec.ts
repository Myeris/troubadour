import { AngularFireDatabase } from '@angular/fire/database';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
// app
import { TabsResource } from './tabs.resource';
import { TabsService } from '../../services/tabs/tabs.service';

class AfDbMock {
  list() {
    return {
      snapshotChanges: () => of({})
    };
  }
}

describe('TabsResource', () => {
  let resource: TabsResource;
  let service: TabsService;
  let db: AngularFireDatabase;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        TabsResource,
        TabsService,
        { provide: AngularFireDatabase, useFactory: () => new AfDbMock() }
      ]
    });

    resource = bed.get(TabsResource);
    service = bed.get(TabsService);
    db = bed.get(AngularFireDatabase);
  });

  it('should be created', () => {
    expect(resource).toBeTruthy();
  });

  describe('getTabList$', () => {
    it('should call list', () => {
      spyOn(db, 'list').and.callThrough();
      spyOn(service, 'mapTabListFromSnapshotAction').and.returnValue(true);

      resource.getTabList$();
      expect(db.list).toHaveBeenCalledTimes(1);

      resource.getTabList$().subscribe(() => {
        expect(service.mapTabListFromSnapshotAction).toHaveBeenCalledTimes(1);
      });
    });
  });
});
