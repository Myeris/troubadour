import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
// app
import { AuthFormComponent } from './auth-form.component';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthFormComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('passwordInvalid', () => {
    it('should return true if password is valid', () => {
      component.form.get('password').markAsTouched();

      component.form.get('password').setValue('valid');
      expect(component.passwordInvalid).toBeFalsy();

      component.form.get('password').setValue('123');
      expect(component.passwordInvalid).toBeFalsy();

      component.form.get('password').setValue('_)dnw');
      expect(component.passwordInvalid).toBeFalsy();
    });

    it('should return false if password is invalid', () => {
      component.form.get('password').markAsTouched();

      component.form.get('password').setValue(null);
      expect(component.passwordInvalid).toBeTruthy();

      component.form.get('password').setValue(undefined);
      expect(component.passwordInvalid).toBeTruthy();
    });
  });

  describe('emailFormatInvalid', () => {
    it('should return true if email is valid', () => {
      component.form.get('email').markAsTouched();

      component.form.get('email').setValue('marie.foussette@gmail.com');
      expect(component.emailFormatInvalid).toBeFalsy();

      component.form.get('email').setValue('email@gmail.com');
      expect(component.emailFormatInvalid).toBeFalsy();
    });

    it('should return false if email is invalid', () => {
      component.form.get('email').markAsTouched();

      component.form.get('email').setValue('test');
      expect(component.emailFormatInvalid).toBeTruthy();

      component.form.get('email').setValue('test@');
      expect(component.emailFormatInvalid).toBeTruthy();

      component.form.get('email').setValue('test.fr');
      expect(component.emailFormatInvalid).toBeTruthy();
    });
  });

  describe('onSubmit', () => {
    it('should throw an error if form invalid', () => {
      spyOn(component.submitted, 'emit').and.callThrough();
      expect(() => component.onSubmit()).toThrow(new Error('Invalid form'));
      expect(component.submitted.emit).not.toHaveBeenCalled();
    });

    it('should emit an event if form is valid', () => {
      spyOn(component.submitted, 'emit').and.callThrough();

      component.form.get('email').setValue('test@test.fr');
      component.form.get('password').setValue('$tr0ng_p@ssw0rd');

      component.onSubmit();
      expect(component.submitted.emit).toHaveBeenCalledTimes(1);
      expect(component.submitted.emit).toHaveBeenCalledWith(component.form);
    });
  });
});
