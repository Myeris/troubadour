import { TestBed } from '@angular/core/testing';

import { TabsResource } from './tabs.resource';
import { TabsService } from '../../services/tabs/tabs.service';
import { AngularFireDatabase } from '@angular/fire/database';

class AfDbMock {
  list() {
    return {
      snapshotChanges: () => {
      }
    };
  }
}

describe('TabsResource', () => {
  let resource: TabsResource;
  let service: TabsService;

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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
