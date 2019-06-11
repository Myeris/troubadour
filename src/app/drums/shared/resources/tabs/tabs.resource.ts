import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// app
import { Tab } from '../../models/tab.model';
import { TabsService } from '../../services/tabs/tabs.service';

@Injectable()
export class TabsResource {
  private colName = 'tabs';

  constructor(private db: AngularFireDatabase, private tabsService: TabsService) {}

  getTabList$(): Observable<Tab[]> {
    return this.db
      .list<Tab>(`${this.colName}`)
      .snapshotChanges()
      .pipe(
        map((actions: SnapshotAction<Tab>[]) =>
          this.tabsService.mapTabListFromSnapshotAction(actions)
        )
      );
  }
}
