import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// app
import { Tag } from '../../models/tag.model';
import { TypesService } from '../../services/types/types.service';

@Injectable()
export class TypesResource {
  private colName = 'types';

  constructor(private db: AngularFireDatabase,
              private typesService: TypesService) {
  }

  public getTypeList$(): Observable<Tag[]> {
    return this.db.list<Tag>(this.colName)
      .snapshotChanges()
      .pipe(map((actions: SnapshotAction<Tag>[]) => this.typesService.mapTypeListFromSnapshotActions(actions)));
  }
}
