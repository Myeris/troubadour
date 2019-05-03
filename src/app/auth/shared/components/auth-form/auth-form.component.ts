import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
  @Output() public submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {
  }

  public get passwordInvalid(): boolean {
    const control = this.form.get('password');
    return control.hasError('required') && control.touched;
  }

  public get emailFormat(): boolean {
    const control = this.form.get('email');
    return control.hasError('email') && control.touched;
  }

  public onSubmit(): Error | void {
    if (this.form.invalid) {
      throw new Error('Invalid form');
    }

    this.submitted.emit(this.form);
  }
}
