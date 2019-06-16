import { Injectable } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
// app
import { Tag } from '../../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  public mapTypeListFromSnapshotActions(actions: SnapshotAction<Tag>[]): Tag[] {
    return actions.map((a: SnapshotAction<Tag>) => {
      const data = a.payload.val();
      const $key = a.payload.key;

      return { $key, ...data };
    });
  }
}
