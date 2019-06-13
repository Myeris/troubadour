import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// app
import { AppState } from '../../../../store/app.reducer';
import { ResetPassword } from '../../../../store/user/actions/user.actions';
import { LifecycleComponent } from '../../../../shared/components/lifecycle/lifecycle.component';
import { getFeedback } from '../../../../store/user/selectors/user.selectors';
import { fadeAnimation } from '../../../../shared/animations/animations';
import { Feedback } from 'src/app/shared/models/feedback.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [fadeAnimation]
})
export class ResetPasswordComponent extends LifecycleComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    email: ['', Validators.email]
  });
  public feedback$: Observable<Feedback>;

  public get emailFormat(): boolean {
    const control = this.form.get('email');
    return control.hasError('email') && control.touched;
  }

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.feedback$ = this.store.select(getFeedback).pipe(takeUntil(this.componentDestroyed$));
  }

  public onSubmit(): void {
    this.store.dispatch(new ResetPassword({ email: this.form.get('email').value }));
  }
}
