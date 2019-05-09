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
import { getError } from '../../../../store/user/selectors/user.selectors';
import { Register } from '../../../../store/user/actions/user.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends LifecycleComponent implements OnInit {
  public error$: Observable<string>;

  constructor(private router: Router,
              private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.error$ = this.store.select(getError)
      .pipe(takeUntil(this.componentDestroyed$));
  }

  public registerUser(event: FormGroup): void {
    const authRequest: AuthRequest = event.value;
    this.store.dispatch(new Register({ authRequest }));
  }
}
