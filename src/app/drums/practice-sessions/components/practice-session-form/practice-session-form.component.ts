import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// app
import { Exercise } from '../../../shared/models/exercise.model';
import { Tag } from '../../../shared/models/tag.model';
import { PracticeSession } from '../../../shared/models/practice-session.model';
import { Tab } from '../../../shared/models/tab.model';
import { PracticeSessionsService } from '../../../shared/services/practice-sessions/practice-sessions.service';

@Component({
  selector: 'app-practice-session-form',
  templateUrl: './practice-session-form.component.html',
  styleUrls: ['./practice-session-form.component.scss']
})
export class PracticeSessionFormComponent implements OnChanges {
  public toggled = false;
  public exists = false;
  public showExerciseForm = false;
  public editedExercise: Exercise;
  public editedExerciseIndex: number;

  @Input() public session: PracticeSession;
  @Input() public tabs: Tab[];
  @Input() public types: Tag[];
  @Input() public exerciseId: string;
  @Input() public feedback: { success: boolean, message: string };

  @Output() public created: EventEmitter<PracticeSession> = new EventEmitter<PracticeSession>();
  @Output() public updated: EventEmitter<PracticeSession> = new EventEmitter<PracticeSession>();
  @Output() public removed: EventEmitter<PracticeSession> = new EventEmitter<PracticeSession>();
  @Output() public added: EventEmitter<Exercise> = new EventEmitter<Exercise>();

  public form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    duration: 0,
    drumkit: false,
    exercises: this.fb.array([], Validators.minLength(0)),
    repeat: [1, Validators.required],
    created: new Date().valueOf(),
    updated: new Date().valueOf(),
    shared: [false, Validators.required]
  });

  public get formExercises(): FormArray {
    return this.form.get('exercises') as FormArray;
  }

  public get formNameInvalid(): boolean {
    const control = this.form.get('name');
    return control.hasError('required') && control.touched;
  }

  constructor(private fb: FormBuilder,
              private practiceSessionsService: PracticeSessionsService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.session && this.session.name && this.tabs) {
      this.exists = true;

      const value = this.session;
      this.form.patchValue(value);

      this.emptyExercise();

      if (value.exercises) {
        for (const exercise of value.exercises) {
          this.formExercises.push(new FormControl(exercise));
        }
      }

      this.session.exercises.forEach((exercise: Exercise) => {
        const tab = this.tabs.filter((t: Tab) => t.$key === exercise.tabRef);

        if (!tab.length) {
          return;
        }

        exercise.tab = tab[0];
      });
    }

    if (this.exerciseId) {
      this.addExercise();
    }
  }

  public addExercise(): void {
    this.showExerciseForm = true;
  }

  public editExercise(exercise: Exercise, index: number): void {
    this.addExercise();
    this.editedExercise = exercise;
    this.editedExerciseIndex = index;
  }

  public addExerciseToForm($event: Exercise): void {
    this.formExercises.push(new FormControl($event));
    this.showExerciseForm = false;

    this.onExerciseChange();
  }

  public editExerciseInForm($event: Exercise): void {
    this.form.value.exercises[this.editedExerciseIndex] = $event;
    this.formExercises.at(this.editedExerciseIndex).setValue($event);

    this.showExerciseForm = false;
    this.editedExercise = null;
    this.editedExerciseIndex = null;
    this.onExerciseChange();
  }

  public removeExercise(i: number): void {
    this.formExercises.removeAt(i);

    this.onExerciseChange();
  }

  public emptyExercise(): void {
    while (this.formExercises.controls.length) {
      this.formExercises.removeAt(0);
    }
  }

  public toggle(): void {
    this.toggled = !this.toggled;
  }

  public createSession(): Error | void {
    if (!this.form.valid) {
      throw new Error('Practice session form invalid');
    }
    this.created.emit(this.form.value);
  }

  public updateSession(): Error | void {
    if (!this.form.valid) {
      throw new Error('Practice session form invalid');
    }
    this.updated.emit(this.form.value);
  }

  public removeSession(): void {
    if (!this.form.valid) {
      throw new Error('Practice session form invalid');
    }
    this.removed.emit(this.form.value);
  }

  public cancelAddExercise(): Error | void {
    this.showExerciseForm = false;
    this.editedExercise = null;
    this.editedExerciseIndex = null;
    this.exerciseId = null;
  }

  public onExerciseChange(): void {
    let duration = 0;
    let needsDrumkit = false;

    this.formExercises.value.forEach((exercise: Exercise) => {
      let start: number = null;
      let stop: number = null;
      let step: number = null;

      if (exercise.hasOwnProperty('bpmScale')) {
        start = exercise.bpmScale.start;
        stop = exercise.bpmScale.stop;
        step = exercise.bpmScale.step;
      }

      if (exercise.bpm) {
        duration += this.practiceSessionsService.getSessionDuration(exercise.tab.timeSignature, exercise.repeat, exercise.bpm);
      }

      if (start && stop && step) {
        for (let i = start; i <= stop; i += step) {
          duration += this.practiceSessionsService.getSessionDuration(exercise.tab.timeSignature, exercise.repeat, i);
        }
      }

      if (exercise.tab.drumkit) {
        needsDrumkit = true;
      }
    });

    this.form.setControl('duration', new FormControl(Math.floor(duration) * this.form.get('repeat').value));
    this.form.setControl('drumkit', new FormControl(needsDrumkit));
  }
}
