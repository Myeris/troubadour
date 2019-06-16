import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
// app
import { AppComponent } from './app.component';
import { UserService } from '../../../auth/shared/services/user.service';
import { appReducers, AppState } from '../../../store/app.reducer';
import { User } from '../../../auth/shared/models/user.model';
import { LogOut, SetPersistedUser } from '../../../store/user/actions/user.actions';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: UserService;
  let store: Store<AppState>;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({ ...appReducers })],
      providers: [UserService],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = bed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = bed.get(UserService);
    store = bed.get(Store);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should dispatch an action if user is defined', async(() => {
      const user: User = {
        email: 'email',
        id: 'id',
        verified: true,
        authenticated: true
      };
      spyOnProperty(service, 'persistedUser').and.returnValue(user);
      spyOn(store, 'dispatch').and.callThrough();

      component.ngOnInit();
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        new SetPersistedUser({ user: (component as any).user })
      );
    }));

    it('should not dispatch an action if user is not defined', () => {
      spyOnProperty(service, 'persistedUser').and.returnValue(null);
      spyOn(store, 'dispatch').and.callThrough();

      component.ngOnInit();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should dispatch an event if user is defined', () => {
      const user: User = {
        email: 'email',
        id: 'id',
        verified: true,
        authenticated: true
      };
      spyOnProperty(service, 'persistedUser').and.returnValue(user);
      spyOn(store, 'dispatch').and.callThrough();

      component.logout();
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new LogOut());
    });
  });
});
