import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sound-options',
  templateUrl: './sound-options.component.html',
  styleUrls: ['./sound-options.component.scss']
})
export class SoundOptionsComponent implements OnChanges {

  public form = this.fb.group({
    type: [0, [Validators.min(0), Validators.max(1)]], // 0 for play-along, 1 for metronome only,
    settings: this.fb.group({
      subdivision: '4',
      accents: this.fb.array([0], Validators.minLength(0))
    })
  });
  public selectedType: number = this.form.get('type').value;

  @Input() initValue: FormGroup;

  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() invalid: EventEmitter<string> = new EventEmitter<string>();

  public get formAccents(): FormArray {
    return this.form.get('settings').get('accents') as FormArray;
  }

  public get type(): number {
    return this.form.get('type').value;
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initValue) {
      if (this.initValue.get('playAlong').value) {
        this.form.get('type').setValue(0);
      }

      if (this.initValue.get('metronomeOnly').value) {
        this.form.get('type').setValue(1);

        // patch form value
        this.form.get('settings').patchValue(this.initValue.get('metronomeSettings').value);
        this.emptyAccents();
        for (const accent of this.initValue.get('metronomeSettings').get('accents').value) {
          this.formAccents.push(new FormControl(accent));
        }
      }

      this.onTypeChange();
    }
  }

  public onTypeChange(): void {
    this.selectedType = parseInt(this.form.get('type').value, 16);

    // If type is 0 (play along), emit the submitted event
    if (this.selectedType === 0) {
      this.submitted.emit(this.form);
    }
  }

  public onMetronomeSettingsChange($event: FormGroup): void {
    this.form.get('settings').get('subdivision').setValue($event.get('subdivision').value);

    this.emptyAccents();

    if ($event.get('accents').value) {
      for (const accent of $event.get('accents').value) {
        this.formAccents.push(new FormControl(accent));
      }
    }

    this.submitted.emit(this.form);
  }

  private emptyAccents(): void {
    while (this.formAccents.controls.length) {
      this.formAccents.removeAt(0);
    }
  }

}
