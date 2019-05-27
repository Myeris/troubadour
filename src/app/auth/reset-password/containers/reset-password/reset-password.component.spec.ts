import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// app
import { ResetPasswordComponent } from './reset-password.component';
import { appReducers, AppState } from '../../../../store/app.reducer';
import { ResetPassword } from '../../../../store/user/actions/user.actions';
import { getError } from '../../../../store/user/selectors/user.selectors';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [BrowserAnimationsModule, ReactiveFormsModule, RouterTestingModule, StoreModule.forRoot(appReducers)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('emailFormat', () => {
    it('should return false if email is badly formatted', () => {
      component.form.get('email').setValue('test');
      expect(component.emailFormat).toBeFalsy();

      component.form.get('email').setValue('test@test');
      expect(component.emailFormat).toBeFalsy();
    });

    it('should return true if email is well formatted', () => {
      component.form.get('email').setValue('test@test.fr');
      expect(component.emailFormat).toBeFalsy();
    });
  });

  describe('ngOnInit', () => {
    it('should select a selector', () => {
      spyOn(store, 'select').and.callThrough();
      component.ngOnInit();
      expect(store.select).toHaveBeenCalledTimes(1);
      expect(store.select).toHaveBeenCalledWith(getError);
    });
  });

  describe('onSubmit', () => {
    it('should dispatch an event', () => {
      spyOn(store, 'dispatch').and.callThrough();
      const email = 'email@gmail.com';
      component.form.get('email').setValue(email);
      component.onSubmit();
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new ResetPassword({ email }));
    });
  });
});
