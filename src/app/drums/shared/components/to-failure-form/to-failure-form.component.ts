import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-to-failure-form',
  templateUrl: './to-failure-form.component.html',
  styleUrls: ['./to-failure-form.component.scss']
})
export class ToFailureFormComponent {
  public form: FormGroup = this.fb.group({
    bpm: [90, [Validators.min(40), Validators.max(250)]],
    step: [5, Validators.min(1)]
  });

  @Output() public submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public invalid: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  public onChange(): void {
    if (this.form.invalid) {
      this.invalid.emit('Invalid form');
    } // TODO better message error
    this.submitted.emit(this.form);
  }
}
