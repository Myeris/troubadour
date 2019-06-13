import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// app
import { AuthRequest } from '../../../shared/models/auth-request.model';
import { LifecycleComponent } from '../../../../shared/components/lifecycle/lifecycle.component';
import { AppState } from '../../../../store/app.reducer';
import {
  isVerified,
  verificationEmailSent,
  getFeedback
} from '../../../../store/user/selectors/user.selectors';
import { LogIn, SendVerificationEmail } from '../../../../store/user/actions/user.actions';
import { fadeAnimation } from '../../../../shared/animations/animations';
import { Feedback } from 'src/app/shared/models/feedback.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAnimation]
})
export class LoginComponent extends LifecycleComponent implements OnInit {
  public feedback$: Observable<Feedback>;
  public isVerified$: Observable<boolean>;
  public emailVerificationSent$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.feedback$ = this.store.select(getFeedback).pipe(takeUntil(this.componentDestroyed$));
    this.isVerified$ = this.store.select(isVerified).pipe(takeUntil(this.componentDestroyed$));
    this.emailVerificationSent$ = this.store
      .select(verificationEmailSent)
      .pipe(takeUntil(this.componentDestroyed$));
  }

  public loginUser(event: FormGroup): void {
    const authRequest: AuthRequest = event.value;
    this.store.dispatch(new LogIn({ authRequest }));
  }

  public resendVerificationEmail(): void {
    this.store.dispatch(new SendVerificationEmail());
  }
}
