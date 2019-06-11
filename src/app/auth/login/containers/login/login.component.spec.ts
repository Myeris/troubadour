import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// app
import { LoginComponent } from './login.component';
import { appReducers, AppState } from '../../../../store/app.reducer';
import { getError, isVerified, verificationEmailSent } from '../../../../store/user/selectors/user.selectors';
import { LogIn, SendVerificationEmail } from '../../../../store/user/actions/user.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...appReducers
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set error$', () => {
      spyOn(store, 'select').and.returnValue(of('error'));
      component.ngOnInit();
      expect(store.select).toHaveBeenCalledTimes(3);
      expect(store.select).toHaveBeenCalledWith(getError);
      expect(store.select).toHaveBeenCalledWith(isVerified);
      expect(store.select).toHaveBeenCalledWith(verificationEmailSent);
      expect(component.error$ instanceof Observable).toBeTruthy();
      expect(component.isVerified$ instanceof Observable).toBeTruthy();
      expect(component.emailVerificationSent$ instanceof Observable).toBeTruthy();
    });
  });

  describe('loginUser', () => {
    it('should dispatch a LogIn action', () => {
      spyOn(store, 'dispatch').and.callThrough();
      const value = { email: 'email', password: 'password' };

      component.loginUser({ value } as FormGroup);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new LogIn({ authRequest: value }));
    });
  });

  describe('resendVerificationEmail', () => {
    it('should send an action to resend a verification email', () => {
      spyOn(store, 'dispatch').and.callThrough();

      component.resendVerificationEmail();
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new SendVerificationEmail());
    });
  });
});
