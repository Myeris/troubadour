import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent {
  public password: FormGroup = this.fb.group({
    old: ['', Validators.required],
    new: ['', Validators.required],
    confirmed: ['', Validators.required]
  });

  @Input() public feedback: { success: boolean, message: string };

  @Output() public changePassword: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {
  }

  public displayPasswordError(formControlName: string): boolean {
    return this.password.get(formControlName).touched &&
      this.password.get(formControlName).hasError('required');
  }

  public updatePassword(): void {
    if (!this.password.valid) {
      throw new Error('Password form invalid.');
    }

    if (this.password.get('new').value !== this.password.get('confirmed').value) {
      this.feedback = {
        success: false,
        message: 'Password mismatched.'
      };

      throw new Error('Password mismatched.');
    }

    this.changePassword.emit(this.password.value);
  }
}
