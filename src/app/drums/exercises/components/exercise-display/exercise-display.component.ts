import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// app
import { Exercise } from '../../../shared/models/exercise.model';
import { MetronomeService } from '../../../shared/services/metronome/metronome.service';
import { ExerciseService } from '../../../shared/services/exercise/exercise.service';
import { Highscore } from '../../../shared/models/highscore.model';
import { Tab } from '../../../shared/models/tab.model';
import { ExercisePracticeForm } from '../../../shared/models/exercise-practice-form.model';

@Component({
  selector: 'app-exercise-display',
  templateUrl: './exercise-display.component.html',
  styleUrls: ['./exercise-display.component.scss']
})
export class ExerciseDisplayComponent implements OnInit {
  @Input() public tab: Tab;
  @Input() public highscore: Highscore;

  public playing = false;
  public exercise: Exercise;
  public showPracticeForm = false;
  public practiceMode: string;
  public lastBpm: number;
  public showToFailureResult = false;

  @Output() public highscored: EventEmitter<Highscore> = new EventEmitter<Highscore>();

  constructor(
    private metronomeService: MetronomeService,
    private exercisesService: ExerciseService
  ) {
    this.metronomeService.init();
  }

  ngOnInit(): void {
    this.exercise = this.setDefaultExercise();
  }

  public async play(addClickCounter: boolean = false): Promise<void> {
    this.playing = true;
    await this.metronomeService.playExercise(this.exercise, addClickCounter);
    this.playing = false;
  }

  public async stop(): Promise<void> {
    this.playing = false;

    this.lastBpm = await this.metronomeService.stop();
    await this.metronomeService.init();
    if (this.practiceMode !== 'toFailure') {
      this.lastBpm = null;
    }

    this.showToFailureResult = this.practiceMode === 'toFailure';

    this.practiceMode = null;
  }

  public onCancel(): void {
    this.showPracticeForm = false;
    this.lastBpm = null;
    this.showToFailureResult = false;
  }

  public async onSubmit(exercisePracticeForm: ExercisePracticeForm): Promise<void> {
    this.showPracticeForm = false;

    // practice mode: bpm & duration
    if (exercisePracticeForm.hasOwnProperty('bpmDuration')) {
      const oneRoundDuration = this.exercisesService.getExerciseDuration(
        this.exercise.tab.timeSignature,
        1,
        exercisePracticeForm.bpmDuration.bpm
      );
      this.exercise = {
        hand: 'R',
        bpm: exercisePracticeForm.bpmDuration.bpm,
        tabRef: this.tab.$key,
        tab: this.tab,
        repeat: Math.ceil(exercisePracticeForm.bpmDuration.duration / oneRoundDuration),
        duration: exercisePracticeForm.bpmDuration.duration
      };

      this.practiceMode = 'bpmDuration';
    }

    // practice mode: bpm scale
    if (exercisePracticeForm.hasOwnProperty('bpmScale')) {
      this.exercise = {
        hand: 'R',
        bpmScale: {
          start: exercisePracticeForm.bpmScale.start,
          stop: exercisePracticeForm.bpmScale.stop,
          step: exercisePracticeForm.bpmScale.step
        },
        tabRef: this.tab.$key,
        tab: this.tab,
        repeat: exercisePracticeForm.bpmScale.repeat
      };

      this.practiceMode = 'bpmScale';
    }

    // practice mode: road to failure (user sets the starting bpm and step values.
    // The exercise stops at 250 bpm.
    // The user must repeat each step 20 times
    if (exercisePracticeForm.hasOwnProperty('toFailure')) {
      this.exercise = {
        hand: 'R',
        bpmScale: {
          start: exercisePracticeForm.toFailure.bpm,
          stop: 250,
          step: 5
        },
        tabRef: this.tab.$key,
        tab: this.tab,
        repeat: 20
      };

      this.practiceMode = 'toFailure';
    }

    if (exercisePracticeForm.hasOwnProperty('soundOptions')) {
      this.exercise.soundOptions = exercisePracticeForm.soundOptions;
    }

    await this.play(true);
    this.exercise = this.setDefaultExercise();
  }

  private setDefaultExercise(): Exercise {
    return {
      hand: 'R',
      bpm: 60,
      tabRef: this.tab.$key,
      tab: this.tab,
      repeat: 1,
      duration: this.exercisesService.getExerciseDuration(this.tab.timeSignature, 1, 60)
    };
  }

  public saveHighscore(bpm: number): void {
    this.lastBpm = null;
    this.showToFailureResult = false;

    this.highscored.emit({
      $key: this.tab.$key,
      name: this.tab.name,
      highscore: bpm,
      date: new Date().valueOf()
    });
  }
}
