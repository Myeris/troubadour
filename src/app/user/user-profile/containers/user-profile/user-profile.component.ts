import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
// app
import { User } from '../../../../auth/shared/models/user.model';
import { AppState } from '../../../../store/app.reducer';
import { getCurrentUser, getError } from '../../../../store/user/selectors/user.selectors';
import { LifecycleComponent } from '../../../../shared/components/lifecycle/lifecycle.component';
import { ChangePassword as ChangePasswordModel } from '../../../../auth/shared/models/change-password.model';
import { ChangePassword } from '../../../../store/user/actions/user.actions';
import { fadeAnimation } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: [fadeAnimation]
})
export class UserProfileComponent extends LifecycleComponent implements OnInit {

  public user$: Observable<User>;
  public error$: Observable<string>;

  constructor(private store: Store<AppState>,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.user$ = this.store.select<User>(getCurrentUser)
      .pipe(takeUntil(this.componentDestroyed$));
    this.error$ = this.store.select<string>(getError)
      .pipe(takeUntil(this.componentDestroyed$));
  }

  public onPasswordChange(changePassword: ChangePasswordModel): void {
    this.store.dispatch(new ChangePassword({ changePassword }));
  }

  public async onAccountRemove(): Promise<any> {
    // try {
    //   await this.userService.remove(this.authService.user.uid);
    //   await this.authService.removeUser();
    //   this.authService.logoutUser();
    //   this.router.navigate(['/auth/login']);
    // } catch (e) {
    //   this.sentryService.captureException(e);
    // }
  }

}
