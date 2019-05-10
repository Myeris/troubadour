import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// app
import { BpmInterval } from '../../../shared/models/bpm-interval.model';

@Component({
  selector: 'app-metronome-options',
  templateUrl: './metronome-options.component.html',
  styleUrls: ['./metronome-options.component.scss']
})
export class MetronomeOptionsComponent {

  public form: FormGroup = this.fb.group({
    bpm: 100,
    beat: 4,
    note: 4,
    subdivision: 4,
    accents: this.fb.array([0], Validators.minLength(0))
  });
  public playing = false;
  public bpm: BpmInterval = {
    min: 40,
    max: 250
  };
  public showAdvancedForm = false;

  @Output() public played: EventEmitter<FormBuilder> = new EventEmitter<FormBuilder>();
  @Output() public stopped: EventEmitter<any> = new EventEmitter<any>();

  public get accents(): FormArray {
    return this.form.get('accents') as FormArray;
  }

  constructor(private fb: FormBuilder) {
  }

  public setAccent(index: number): void {
    if (this.isAccent(index)) {
      this.accents.removeAt(this.accents.value.indexOf(index));
    } else {
      this.accents.push(new FormControl(index));
    }

    this.restart();
  }

  public isAccent(index: number): boolean {
    return this.accents.value.indexOf(index) > -1;
  }

  public play(): void {
    this.playing = true;
    this.form.setControl('subdivision', new FormControl(parseInt(this.form.value.subdivision, 16)));
    this.form.setControl('note', new FormControl(parseInt(this.form.value.note, 16)));

    this.played.emit(this.form.value);
  }

  public stop(): void {
    this.playing = false;
    this.stopped.emit();

    for (let i = 0; i < this.form.value.beat; i++) {
      const div = document.getElementById(`metronome-${i}`);
      if (div && div.classList.contains('active')) {
        div.classList.remove('active');
      }
    }
  }

  public changeBpm(increase: boolean): void {
    if (!increase && this.form.value.bpm === this.bpm.min) {
      return;
    }
    if (increase && this.form.value.bpm === this.bpm.max) {
      return;
    }

    if (increase) {
      this.form.value.bpm++;
    } else {
      this.form.value.bpm--;
    }

    this.form.setControl('bpm', new FormControl(this.form.value.bpm));
    this.restart();
  }

  public restart(): void {
    if (!this.playing) {
      return;
    }

    this.stop();
    setTimeout(() => this.play(), 500);
  }

}
