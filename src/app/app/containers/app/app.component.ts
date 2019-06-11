import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// app
import { UserService } from '../../../auth/shared/services/user.service';
import { User } from '../../../auth/shared/models/user.model';
import { AppState } from '../../../store/app.reducer';
import { LogOut, SetPersistedUser } from '../../../store/user/actions/user.actions';
import { canUseApp, getCurrentUser } from '../../../store/user/selectors/user.selectors';
import { LifecycleComponent } from '../../../shared/components/lifecycle/lifecycle.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent extends LifecycleComponent implements OnInit {
  public user$: Observable<User>;
  public canUseApp$: Observable<boolean>;
  private user: User;

  constructor(private userService: UserService, private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.user$ = this.store.select(getCurrentUser).pipe(takeUntil(this.componentDestroyed$));
    this.canUseApp$ = this.store.select(canUseApp).pipe(takeUntil(this.componentDestroyed$));

    this.user = this.userService.persistedUser;

    if (this.user) {
      this.store.dispatch(new SetPersistedUser({ user: this.user }));
    }
  }

  logout(): void {
    this.store.dispatch(new LogOut());
  }
}
