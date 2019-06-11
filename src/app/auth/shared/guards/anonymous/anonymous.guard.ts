import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
// app
import { AppState } from '../../../../store/app.reducer';
import { canUseApp } from '../../../../store/user/selectors/user.selectors';

@Injectable()
export class AnonymousGuard implements CanActivate, CanActivateChild {

  constructor(private store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(canUseApp)
      .pipe(
        map((authorized: boolean) => {
          console.log(authorized);
          return !authorized;
        }),
        take(1)
      );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }
}
