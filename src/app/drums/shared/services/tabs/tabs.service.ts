import { Injectable } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
// app
import { Tab } from '../../models/tab.model';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  constructor() {}

  public mapTabListFromSnapshotAction(actions: SnapshotAction<Tab>[]): Tab[] {
    return actions.map((a: SnapshotAction<Tab>) => {
      const data = a.payload.val();
      const $key = a.payload.key;

      return { $key, ...data };
    });
  }
}
