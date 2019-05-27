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
import { getError } from '../../../../store/user/selectors/user.selectors';
import { LogIn } from '../../../../store/user/actions/user.actions';

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
      expect(store.select).toHaveBeenCalledTimes(1);
      expect(store.select).toHaveBeenCalledWith(getError);
      expect(component.error$ instanceof Observable).toBeTruthy();
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
      // TODO
    });
  });
});
