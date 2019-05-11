import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
// app
import { UserProfileComponent } from './user-profile.component';
import { appReducers, AppState } from '../../../../store/app.reducer';
import { PasswordFormComponent } from '../../components/password-form/password-form.component';
import { RemoveFormComponent } from '../../components/remove-form/remove-form.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let el: DebugElement;
  let store: Store<AppState>;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [
        UserProfileComponent,
        PasswordFormComponent,
        RemoveFormComponent
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({ ...appReducers })
      ]
    });

    fixture = bed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    store = bed.get(Store);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be displayed', () => {
    expect(el.query(By.css('h1')).nativeElement.textContent).toContain('Edit your user profile');
    expect(el.query(By.css('password-form'))).toBeDefined();
    expect(el.query(By.css('remove-form'))).toBeDefined();
  });

  it('should display an error when failing to update password', () => {
    // TODO
  });
});
