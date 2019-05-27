import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// app
import { RegisterComponent } from './register.component';
import { appReducers, AppState } from '../../../../store/app.reducer';
import { getError } from '../../../../store/user/selectors/user.selectors';
import { Register } from '../../../../store/user/actions/user.actions';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let store: Store<AppState>;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
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

  describe('registerUser', () => {
    it('should dispatch a Register action', () => {
      spyOn(store, 'dispatch').and.callThrough();
      const value = { email: 'email', password: 'password' };

      component.registerUser({ value } as FormGroup);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new Register({ authRequest: value }));
    });
  });
});
