import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '@ngrx/store';
// app
import {UserService} from '../../auth/shared/services/user.service';
import {User} from '../../auth/shared/models/user.model';
import {AppState} from '../../store/app.reducer';
import {LogInSuccess} from '../../store/user/actions/user.actions';
import {TabListLoad} from '../../store/tabs/actions/tabs.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public user: User;

  constructor(private userService: UserService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.user = this.userService.persistedUser;

    if (this.user) {
      this.store.dispatch(new LogInSuccess({user: this.user}));
      this.store.dispatch(new TabListLoad());
    }
  }
}
