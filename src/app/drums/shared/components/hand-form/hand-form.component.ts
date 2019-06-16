import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hand-form',
  templateUrl: './hand-form.component.html',
  styleUrls: ['./hand-form.component.scss']
})
export class HandFormComponent implements OnChanges {
  @Input() initValue: string;

  public form = this.fb.group({
    hand: ['R', Validators.required]
  });

  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() invalid: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initValue) {
      this.form.get('hand').setValue(this.initValue);
    }
  }

  public onChange(): void {
    if (this.form.invalid) {
      this.invalid.emit('Invalid form');
    } else {
      this.submitted.emit(this.form);
    }
  }
}
