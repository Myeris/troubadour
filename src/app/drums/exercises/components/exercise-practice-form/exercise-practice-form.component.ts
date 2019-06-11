import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
// app
import { ExercicePracticeFormDisplayStatus } from '../../../shared/models/exercice-practice-form-display-status.model';

@Component({
  selector: 'app-exercise-practice-form',
  templateUrl: './exercise-practice-form.component.html',
  styleUrls: ['./exercise-practice-form.component.scss']
})
export class ExercisePracticeFormComponent {
  public form = this.fb.group({
    bpmDuration: this.fb.group({
      bpm: 60,
      duration: 60
    }),
    bpmScale: this.fb.group({
      start: 90,
      stop: 120,
      step: 5,
      repeat: 20
    }),
    toFailure: this.fb.group({
      bpm: 90,
      step: 5
    }),
    soundOptions: this.fb.group({
      metronomeOnly: false,
      playAlong: true,
      metronomeSettings: this.fb.group({
        subdivision: 4,
        accents: this.fb.array([0])
      })
    })
  });

  public showForms: ExercicePracticeFormDisplayStatus = {
    toFailure: false,
    bpmDuration: false,
    bpmScale: false
  };

  public get showSoundOptions(): boolean {
    return this.showForms.toFailure || this.showForms.bpmDuration || this.showForms.bpmScale;
  }

  public get formAccents(): FormArray {
    return this.form
      .get('soundOptions')
      .get('metronomeSettings')
      .get('accents') as FormArray;
  }

  @Output() public submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public cancelled: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  public onFormValueChange(formName: string, formData: FormGroup): void {
    this.form.setControl(formName, formData);
  }

  public toggleForm(formName: string): void {
    this.showForms[formName] = true;

    // unselect all others
    for (const i in this.showForms) {
      if (i !== formName) {
        this.showForms[i] = !this.showForms[formName];
      }
    }
  }

  public isButtonDisabled(): boolean {
    let disabled = true;

    for (const i in this.showForms) {
      if (this.showForms[i]) {
        disabled = false;
      }
    }

    return disabled;
  }

  public cancel(): void {
    this.cancelled.emit();
  }

  public submit(): void {
    for (const i in this.showForms) {
      if (!this.showForms[i]) {
        this.form.removeControl(i);
      }
    }

    this.submitted.emit(this.form.value);
  }

  public onSoundOptionsChange(formGroup: FormGroup): void {
    const soundOptionsForm: FormGroup = this.form.get('soundOptions') as FormGroup;
    const type: number = parseInt(formGroup.get('type').value, 16);

    if (type === 0) {
      soundOptionsForm.get('playAlong').setValue(true);
      soundOptionsForm.get('metronomeOnly').setValue(false);
      soundOptionsForm.get('metronomeSettings').patchValue({ subdivision: '4', accents: [0] });
    }

    if (type === 1) {
      soundOptionsForm.get('playAlong').setValue(false);
      soundOptionsForm.get('metronomeOnly').setValue(true);
      soundOptionsForm.get('metronomeSettings').patchValue(formGroup.get('settings').value);

      this.emptyAccents();
      if (formGroup.get('settings').get('accents').value) {
        for (const accent of formGroup.get('settings').get('accents').value) {
          this.formAccents.push(new FormControl(accent));
        }
      }
    }
  }

  private emptyAccents(): void {
    while (this.formAccents.controls.length) {
      this.formAccents.removeAt(0);
    }
  }
}
