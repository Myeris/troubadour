import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// app
import { UserProfileComponent } from './user-profile.component';
import { appReducers, AppState } from '../../../../store/app.reducer';
import { PasswordFormComponent } from '../../components/password-form/password-form.component';
import { RemoveFormComponent } from '../../components/remove-form/remove-form.component';
import { getCurrentUser, getFeedback } from '../../../../store/user/selectors/user.selectors';
import { ChangePassword as ChangePasswordModel } from '../../../../auth/shared/models/change-password.model';
import { ChangePassword } from '../../../../store/user/actions/user.actions';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let el: DebugElement;
  let store: Store<AppState>;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [UserProfileComponent, PasswordFormComponent, RemoveFormComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({ ...appReducers })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = bed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    store = bed.get(Store);

    spyOn(store, 'select').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    expect(el.query(By.css('h1')).nativeElement.textContent).toContain('Edit your user profile');
    expect(el.query(By.css('password-form'))).toBeDefined();
    expect(el.query(By.css('remove-form'))).toBeDefined();
  });

  describe('ngOnInit', () => {
    it('should get elements from store', () => {
      component.ngOnInit();
      expect(store.select).toHaveBeenCalledTimes(2);
      expect(store.select).toHaveBeenCalledWith(getCurrentUser);
      expect(store.select).toHaveBeenCalledWith(getFeedback);
    });
  });

  describe('onPasswordChange', () => {
    it('should dispatch an event', () => {
      const changePassword: ChangePasswordModel = { old: 'a', new: 'b', confirmed: 'b' };
      component.onPasswordChange(changePassword);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new ChangePassword({ changePassword }));
    });
  });

  describe('onAccountRemove', () => {
    // TODO
  });
});
