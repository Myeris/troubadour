import { TestBed } from '@angular/core/testing';
// app
import { TypesService } from './types.service';
import { SnapshotAction } from '@angular/fire/database';
import { Tag } from '../../models/tag.model';

describe('TypesService', () => {
  let service: TypesService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [TypesService]
    });

    service = bed.get(TypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('mapTypeListFromSnapshotActions', () => {
    it('should return a list of Tag from snapshot action', () => {
      expect(service.mapTypeListFromSnapshotActions([
        {
          payload: {
            key: 'a',
            val(): Tag {
              return {
                $key: 'a'
              } as Tag;
            }
          }
        } as SnapshotAction<Tag>
      ]).length).toBe(1);
    });
  });
});
