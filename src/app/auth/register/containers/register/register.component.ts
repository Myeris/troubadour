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
import { getFeedback } from '../../../../store/user/selectors/user.selectors';
import { Register } from '../../../../store/user/actions/user.actions';
import { fadeAnimation } from '../../../../shared/animations/animations';
import { Feedback } from 'src/app/shared/models/feedback.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeAnimation]
})
export class RegisterComponent extends LifecycleComponent implements OnInit {
  public feedback$: Observable<Feedback>;

  constructor(private router: Router, private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.feedback$ = this.store.select(getFeedback).pipe(takeUntil(this.componentDestroyed$));
  }

  public registerUser(event: FormGroup): void {
    const authRequest: AuthRequest = event.value;
    this.store.dispatch(new Register({ authRequest }));
  }
}
