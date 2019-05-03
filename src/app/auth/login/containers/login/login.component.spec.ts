import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {Store, StoreModule} from '@ngrx/store';
// app
import {LoginComponent} from './login.component';
import {appReducers, AppState} from '../../../shared/store/app.reducer';
import {getError} from '../../../shared/store/user/selectors/user.selectors';
import {FormGroup} from '@angular/forms';
import {LogIn} from '../../../shared/store/user/actions/user.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
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
      spyOn(store, 'select').and.callThrough();
      component.ngOnInit();
      expect(store.select).toHaveBeenCalledTimes(1);
      expect(store.select).toHaveBeenCalledWith(getError);
    });
  });

  describe('loginUser', () => {
    it('should dispatch a LogIn action', () => {
      spyOn(store, 'dispatch').and.callThrough();
      const value = {email: 'email', password: 'password'};

      component.loginUser({value} as FormGroup);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new LogIn({authRequest: value}));
    });
  });
});
