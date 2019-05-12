import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
// app
import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
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

  describe('onSubmit', () => {
    // TODO
  });
});
