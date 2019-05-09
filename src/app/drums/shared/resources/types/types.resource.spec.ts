import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
// app
import { TypesResource } from './types.resource';
import { TypesService } from '../../services/types/types.service';

class AfBdMock {
}

describe('TypesResource', () => {
  let resource: TypesResource;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        TypesResource,
        TypesService,
        { provide: AngularFireDatabase, useClass: AfBdMock }
      ]
    });

    resource = bed.get(TypesResource);
  });

  it('should be created', () => {
    expect(resource).toBeTruthy();
  });
});
