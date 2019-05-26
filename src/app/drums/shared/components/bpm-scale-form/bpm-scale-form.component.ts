import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bpm-scale-form',
  templateUrl: './bpm-scale-form.component.html',
  styleUrls: ['./bpm-scale-form.component.scss']
})
export class BpmScaleFormComponent implements OnChanges {
  public form: FormGroup = this.fb.group({
    start: [90, [Validators.min(40), Validators.max(250)]],
    stop: [120, [Validators.min(40), Validators.max(250)]],
    step: [5, Validators.min(1)],
    repeat: [20, Validators.min(1)]
  });

  @Input() public bpmScale: FormGroup;

  @Output() public submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public invalid: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.bpmScale) {
      this.form.patchValue(this.bpmScale.value);
    }
  }

  public onChange(): void {
    if (this.form.invalid) {
      this.invalid.emit('Invalid form'); // TODO better error
    } else {
      this.submitted.emit(this.form);
    }
  }
}
