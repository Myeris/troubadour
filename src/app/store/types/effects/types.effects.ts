import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { FirebaseError } from 'firebase';
import { catchError, map, switchMap } from 'rxjs/operators';
// app
import { TypesActionsTypes, TypesListLoad, TypesListLoadFail, TypesListLoadSuccess } from '../actions/types.actions';
import { TypesResource } from '../../../drums/shared/resources/types/types.resource';
import { Tag } from '../../../drums/shared/models/tag.model';

@Injectable()
export class TypesEffects {

  @Effect()
  loadList$: Observable<Action> = this.actions$
    .pipe(
      ofType<TypesListLoad>(TypesActionsTypes.LoadList),
      switchMap(() => this.typesResource.getTypeList$()),
      map((types: Tag[]) => new TypesListLoadSuccess({ types })),
      catchError((error: FirebaseError) => of(new TypesListLoadFail({ error: error.message })))
    );

  constructor(private actions$: Actions,
              private typesResource: TypesResource) {
  }
}
