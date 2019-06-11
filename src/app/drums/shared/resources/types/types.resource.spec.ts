import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';
// app
import { TypesResource } from './types.resource';
import { TypesService } from '../../services/types/types.service';

class AfDbMock {
  list() {
    return {
      snapshotChanges: () => of({})
    };
  }
}

describe('TypesResource', () => {
  let resource: TypesResource;
  let service: TypesService;
  let db: AngularFireDatabase;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [TypesResource, TypesService, { provide: AngularFireDatabase, useClass: AfDbMock }]
    });

    resource = bed.get(TypesResource);
    service = bed.get(TypesService);
    db = bed.get(AngularFireDatabase);
  });

  it('should be created', () => {
    expect(resource).toBeTruthy();
  });

  describe('getTypeList$', () => {
    it('should call the list', () => {
      spyOn(db, 'list').and.callThrough();
      spyOn(service, 'mapTypeListFromSnapshotActions').and.returnValue(true);

      resource.getTypeList$();
      expect(db.list).toHaveBeenCalledTimes(1);

      resource.getTypeList$().subscribe(() => {
        expect(service.mapTypeListFromSnapshotActions).toHaveBeenCalledTimes(1);
      });
    });
  });
});
