import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bpm-duration-form',
  templateUrl: './bpm-duration-form.component.html',
  styleUrls: ['./bpm-duration-form.component.scss']
})
export class BpmDurationFormComponent implements OnChanges {
  public form: FormGroup = this.fb.group({
    bpm: [60, [Validators.min(40), Validators.max(250)]],
    duration: [60, Validators.min(0)]
  });

  @Input() public initBpm: number;
  @Input() public initDuration: number;

  @Output() public submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public invalid: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initBpm) {
      this.form.get('bpm').setValue(this.initBpm);
    }

    if (this.initDuration) {
      this.form.get('duration').setValue(this.initDuration);
    }
  }

  public onChange(): void {
    if (this.form.invalid) {
      this.invalid.emit('Invalid form'); // TODO better error message
    } else {
      this.submitted.emit(this.form);
    }
  }
}
