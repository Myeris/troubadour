import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  public form: FormGroup = this.fb.group({
    email: ['', Validators.email]
  });

  public feedback: { success: boolean, message: string };

  constructor(private fb: FormBuilder) {
  }

  public get emailFormat(): boolean {
    const control = this.form.get('email');
    return control.hasError('email') && control.touched;
  }

  public async onSubmit(): Promise<void> {
    console.log('TODO'); // TODO
  }
}
