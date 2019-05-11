import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// app
import { UserService } from '../../../auth/shared/services/user.service';
import { User } from '../../../auth/shared/models/user.model';
import { AppState } from '../../../store/app.reducer';
import { LogInSuccess, LogOut } from '../../../store/user/actions/user.actions';
import { getCurrentUser } from '../../../store/user/selectors/user.selectors';
import { LifecycleComponent } from '../../../shared/components/lifecycle/lifecycle.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent extends LifecycleComponent implements OnInit {
  public user$: Observable<User>;
  private user: User;

  constructor(private userService: UserService,
              private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.user$ = this.store.select(getCurrentUser)
      .pipe(takeUntil(this.componentDestroyed$));

    this.user = this.userService.persistedUser;

    if (this.user) {
      this.store.dispatch(new LogInSuccess({ user: this.user }));
    }
  }

  logout(): void {
    if (!this.user) {
      this.user = this.userService.persistedUser;
    }

    if (this.user) {
      this.store.dispatch(new LogOut());
    }
  }
}