import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
// app
import {AppState} from '../../../shared/store/app.reducer';
import {LogIn} from '../../../shared/store/user/actions/user.actions';
import {AuthRequest} from '../../../shared/models/auth-request.model';
import {getError} from '../../../shared/store/user/selectors/user.selectors';
import {LifecycleComponent} from '../../../../shared/components/lifecycle/lifecycle.component';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends LifecycleComponent implements OnInit {
  public error$: Observable<string>;
  public showEmailVerificationButton = false;

  constructor(private router: Router,
              private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.error$ = this.store.select(getError)
      .pipe(takeUntil(this.componentDestroyed$));
  }

  public loginUser(event: FormGroup): void {
    const authRequest: AuthRequest = event.value;
    this.store.dispatch(new LogIn({authRequest}));
  }

  public async resendVerificationEmail(): Promise<void> {
    console.log('TODO'); // TODO
  }
}
