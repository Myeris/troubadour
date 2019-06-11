import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
// app
import { PasswordFormComponent } from './password-form.component';

describe('PasswordFormComponent', () => {
  let component: PasswordFormComponent;
  let fixture: ComponentFixture<PasswordFormComponent>;
  let el: DebugElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      declarations: [PasswordFormComponent],
      imports: [ReactiveFormsModule, RouterTestingModule]
    });

    fixture = bed.createComponent(PasswordFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should display an error a password input is empty', async () => {
    const oldPwd = component.password.get('old');
    const newPwd = component.password.get('new');
    const confirmedPwd = component.password.get('confirmed');

    oldPwd.markAsTouched();
    expect(oldPwd.hasError('required')).toBeTruthy();
    expect(component.displayPasswordError('old')).toBeTruthy();

    newPwd.markAsTouched();
    expect(newPwd.hasError('required')).toBeTruthy();
    expect(component.displayPasswordError('new')).toBeTruthy();

    confirmedPwd.markAsTouched();
    expect(confirmedPwd.hasError('required')).toBeTruthy();
    expect(component.displayPasswordError('confirmed')).toBeTruthy();

    fixture.detectChanges();
    await fixture.whenStable();
    expect(el.queryAll(By.css('.error'))[0].nativeElement.textContent).toContain(
      'Please enter your old password'
    );
    expect(el.queryAll(By.css('.error'))[1].nativeElement.textContent).toContain(
      'Please enter a new password'
    );
    expect(el.queryAll(By.css('.error'))[2].nativeElement.textContent).toContain(
      'Please confirm your new password'
    );
  });

  describe('displayPasswordError', () => {
    it('should return true if there is an error', () => {
      component.password.get('old').setValue('');
      component.password.get('old').markAsTouched();
      expect(component.displayPasswordError('old')).toBeTruthy();

      component.password.get('new').setValue('');
      component.password.get('new').markAsTouched();
      expect(component.displayPasswordError('new')).toBeTruthy();

      component.password.get('confirmed').setValue('');
      component.password.get('confirmed').markAsTouched();
      expect(component.displayPasswordError('confirmed')).toBeTruthy();
    });

    it('should return false if there is no error', () => {
      component.password.get('old').setValue('apassword');
      component.password.get('old').markAsTouched();
      expect(component.displayPasswordError('old')).toBeFalsy();

      component.password.get('new').setValue('apassword');
      component.password.get('new').markAsTouched();
      expect(component.displayPasswordError('old')).toBeFalsy();

      component.password.get('confirmed').setValue('apassword');
      component.password.get('confirmed').markAsTouched();
      expect(component.displayPasswordError('old')).toBeFalsy();
    });
  });

  describe('updatePassword', () => {
    it('should throw an error if form is invalid', () => {
      component.password.markAsTouched();
      expect(() => component.updatePassword()).toThrow(new Error('Password form invalid.'));
    });

    it('should throw an error if password mismatched', () => {
      component.password.get('old').setValue('old');
      component.password.get('new').setValue('new');
      component.password.get('confirmed').setValue('notthesame');
      expect(() => component.updatePassword()).toThrow(new Error('Password mismatched.'));
    });

    it('should emit an event', () => {
      spyOn(component.changePassword, 'emit').and.callThrough();
      component.password.get('old').setValue('old');
      component.password.get('new').setValue('new');
      component.password.get('confirmed').setValue('new');
      component.updatePassword();
      expect(component.changePassword.emit).toHaveBeenCalledTimes(1);
    });
  });
});
