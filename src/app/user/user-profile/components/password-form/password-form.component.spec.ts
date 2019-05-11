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
      declarations: [
        PasswordFormComponent
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ]
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
    expect(el.queryAll(By.css('.error'))[0].nativeElement.textContent).toContain('Please enter your old password');
    expect(el.queryAll(By.css('.error'))[1].nativeElement.textContent).toContain('Please enter a new password');
    expect(el.queryAll(By.css('.error'))[2].nativeElement.textContent).toContain('Please confirm your new password');
  });

  it('should emit an event to update the password', () => {
    const spy = spyOn(component.changePassword, 'emit');

    component.password.get('old').setValue('azerty');
    component.password.get('new').setValue('1234');
    component.password.get('confirmed').setValue('1234');
    component.password.get('old').markAsTouched();
    component.password.get('new').markAsTouched();
    component.password.get('confirmed').markAsTouched();

    component.updatePassword();
    expect(spy).toHaveBeenCalled();
  });
});
