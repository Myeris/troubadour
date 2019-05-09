import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-metronome-settings',
  templateUrl: './metronome-settings.component.html',
  styleUrls: ['./metronome-settings.component.scss']
})
export class MetronomeSettingsComponent implements OnChanges {

  public form = this.fb.group({
    subdivision: 4,
    accents: this.fb.array([0])
  });

  @Input() initValue: FormGroup;
  @Output() changed: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {
  }

  public get subdivision(): number {
    return parseInt(this.form.get('subdivision').value, 16);
  }

  public get accents(): FormArray {
    return this.form.get('accents') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initValue) {
      this.form.patchValue(this.initValue.value);
      this.emptyAccents();
      for (const accent of this.initValue.get('accents').value) {
        this.accents.push(new FormControl(accent));
      }

      this.changed.emit(this.form);
    }
  }

  public onChange(): void {
    this.changed.emit(this.form);
  }

  public isAccent(index: number): boolean {
    return this.accents.value.find((idx: number) => idx === index) > -1;
  }

  public onAccentChange(index: number, value: any): void {
    const bool: boolean = value.target.checked;

    if (bool) {
      this.accents.push(new FormControl(index));
    } else {
      const toRemoveIdx: number = this.accents.value.findIndex((idx: number) => idx === index);
      if (toRemoveIdx !== null) {
        this.accents.removeAt(toRemoveIdx);
      }
    }

    // form changed, emit event
    this.onChange();
  }

  private emptyAccents(): void {
    while (this.accents.controls.length) {
      this.accents.removeAt(0);
    }
  }

}
