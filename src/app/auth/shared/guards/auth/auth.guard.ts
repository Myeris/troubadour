import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';
// app
import { AppState } from '../../../../store/app.reducer';
import { canUseApp } from '../../../../store/user/selectors/user.selectors';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private store: Store<AppState>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(canUseApp)
      .pipe(
        map((authorized: boolean) => authorized),
        tap((authorized: boolean) => {
          if (!authorized) {
            this.router.navigate(['/auth']);
          }
        }),
        take(1)
      );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }
}
