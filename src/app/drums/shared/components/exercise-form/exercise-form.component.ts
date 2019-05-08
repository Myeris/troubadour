import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Tab} from '../../models/tab.model';
import {Tag} from '../../models/tag.model';
import {Exercise} from '../../models/exercise.model';
import {Pagination} from '../../models/pagination.model';
import {ExerciseService} from '../../services/exercise/exercise.service';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnChanges {
  @Input() public tabs: Tab[];
  @Input() public types: Tag[];
  @Input() public selected: string;
  @Input() public editedExercise: Exercise;

  @Output() public added: EventEmitter<Exercise> = new EventEmitter<Exercise>();
  @Output() public edited: EventEmitter<Exercise> = new EventEmitter<Exercise>();
  @Output() public cancelled: EventEmitter<any> = new EventEmitter<any>();

  public selectedExercise: Exercise;
  public selectedTabName: string;
  public selectedType = 0;
  public feedback: string;
  public tabImgs: Map<string, string> = new Map();
  public showFullForm = false;
  public selectedTab: Tab;
  public activeFilter: Tag;
  public filteredTabs: Tab[];
  public searchText: string;
  public pagination: Pagination = {current: 1, itemsPerPage: 8};

  public form: FormGroup = this.fb.group({
    bpm: 60,
    duration: 60,
    bpmScale: this.fb.group({
      start: null,
      stop: null,
      step: null,
      repeat: 1
    }),
    soundOptions: this.fb.group({
      metronomeOnly: false,
      playAlong: true,
      metronomeSettings: this.fb.group({
        subdivision: 4,
        accents: this.fb.array([0])
      })
    }),
    repeat: 1,
    hand: 'R',
    tab: null,
    tabRef: null
  });

  constructor(private fb: FormBuilder,
              private exerciseService: ExerciseService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selected && this.tabs) {
      console.log(this.editedExercise, this.tabs);

      const tab = this.tabs.filter((t: Tab) => t.$key === this.editedExercise.tabRef);

      if (!tab.length) {
        throw new Error('Could not find tab');
      }

      this.selectExercise(tab[0]);
    }

    if (this.tabs && this.editedExercise) {
      this.selectedTabName = this.editedExercise.tab.name;
      this.selectedType = this.editedExercise.bpm ? 0 : 1;

      // init UI
      this.onTabChange({target: {value: this.selectedTabName}});

      // patch form values
      this.form.patchValue(this.editedExercise);
      if (this.editedExercise.soundOptions.metronomeOnly) {
        this.emptyAccents();
        for (const accent of this.editedExercise.soundOptions.metronomeSettings.accents) {
          this.formAccents.push(new FormControl(accent));
        }
      }

      document.getElementById('exerciseForm').scrollIntoView();
      this.showFullForm = true;
    }

    // get img for each tab
    if (this.tabs) {
      this.tabs.forEach((tab: Tab) => this.tabImgs.set(tab.$key, this.getTabImg(tab, false)));
      this.filteredTabs = this.tabs;
    }
  }

  public get formAccents(): FormArray {
    return this.form.get('soundOptions').get('metronomeSettings').get('accents') as FormArray;
  }

  public onTabChange($event: any): void {
    const tabName = $event.target.value;
    const filtered = this.tabs.filter((tab: Tab) => tab.name === tabName);
    const selectedTab = filtered.length ? filtered[0] : null;

    if (selectedTab) {
      this.selectedExercise = this.editedExercise ? this.editedExercise : {
        hand: 'R',
        bpm: 60,
        duration: 60,
        tab: selectedTab,
        tabRef: selectedTab.$key,
        repeat: 1
      };

      if (this.selectedType === 0) {
        this.form.get('bpm').setValue(this.selectedExercise.bpm);
        this.form.get('duration').setValue(this.selectedExercise.duration);
      }

      if (this.selectedType === 1) {
        this.form.get('bpmScale').patchValue(this.selectedExercise.bpmScale);
      }

      this.form.get('repeat').setValue(this.selectedExercise.repeat);
      this.form.get('tab').setValue(this.selectedExercise.tab);
      this.form.get('tabRef').setValue(this.selectedExercise.tabRef);
    }
  }

  public onTypeChange($event: any): void {
    const type: number = parseInt($event.target.value, 16);

    if (type === 0) {
      this.form.setControl('bpm', new FormControl(90));
      this.form.setControl('duration', new FormControl(60));
      this.form.removeControl('bpmScale');
    }

    if (type === 1) {
      this.form.setControl('bpmScale', new FormGroup({
        start: new FormControl(90),
        stop: new FormControl(120),
        step: new FormControl(5),
        repeat: new FormControl(1)
      }));

      this.form.removeControl('bpm');
      this.form.removeControl('duration');
    }

    this.selectedType = type;
  }

  public addExercise(): void {
    if (this.form.value.repeat === 0 || this.form.value.duration === 0) {
      throw new Error('Exercise needs a duration value or a repeat value');
    } // TODO handle error

    // set the repeat value for bpm / duration exercise
    if (this.selectedType === 0) {
      const duration = this.form.get('duration').value;
      const oneRoundDuration = this.exerciseService
        .getExerciseDuration(this.selectedExercise.tab.timeSignature, 1, this.form.get('bpm').value);

      this.form.get('repeat').setValue(Math.ceil(duration / oneRoundDuration));
    }

    // set the duration for bpm scale
    if (this.selectedType === 1) {
      const {start, stop, step, repeat} = this.form.value.bpmScale;
      let duration = 0;

      for (let i = start; i <= stop; i += step) {
        duration += this.exerciseService.getExerciseDuration(this.selectedExercise.tab.timeSignature, repeat, i);
      }

      this.form.get('repeat').setValue(repeat);
      this.form.setControl('duration', new FormControl(Math.ceil(duration)));
    }

    this.editedExercise ? this.edited.emit(this.form.value) : this.added.emit(this.form.value);

    this.form.reset();
    this.selectedExercise = null;
    this.editedExercise = null;
  }

  public cancel(): void {
    this.cancelled.emit();
  }

  public getTabImg(tab: Tab, animate: boolean): string {
    this.tabImgs.set(tab.$key, `/img/drums/gifs/not-found/not-found.${animate ? 'gif' : 'png'}`);

    return `/img/drums/gifs/not-found/not-found.${animate ? 'gif' : 'png'}`;
  }

  public selectExercise(tab: Tab): void {
    if (!tab) {
      this.showFullForm = false;
      this.selectedTabName = null;
      this.selectedTab = null;
      this.selectedExercise = null;
      this.form.get('tab').setValue(null);
      this.form.get('tabRef').setValue(null);
      return;
    }

    this.showFullForm = true;
    this.selectedTabName = tab.name;
    this.selectedTab = tab;
    this.selectedExercise = {
      hand: 'R',
      bpm: 60,
      duration: 60,
      tab: this.selectedTab,
      tabRef: this.selectedTab.$key,
      repeat: 1
    };
    this.form.get('tab').setValue(tab);
    this.form.get('tabRef').setValue(tab.$key);
  }

  public setFormControl(formControlName: string, formData: FormGroup): void {
    this.form.get(formControlName).setValue(formData.get(formControlName).value);
  }

  public setFormGroup(formGroupName: string, formData: FormGroup): void {
    this.form.get(formGroupName).setValue(formData.value);
  }

  public handleInvalidForm(formControlName: string, message: string): void {
    this.feedback = `${formControlName}: ${message}`;
  }

  public onSoundOptionsChange($event: FormGroup): void {
    const soundOptionsForm: FormGroup = this.form.get('soundOptions') as FormGroup;
    const type: number = parseInt($event.get('type').value, 16);

    if (type === 0) {
      soundOptionsForm.get('playAlong').setValue(true);
      soundOptionsForm.get('metronomeOnly').setValue(false);
      soundOptionsForm.get('metronomeSettings').patchValue({subdivision: '4', accents: [0]});
    }

    if (type === 1) {
      soundOptionsForm.get('playAlong').setValue(false);
      soundOptionsForm.get('metronomeOnly').setValue(true);
      soundOptionsForm.get('metronomeSettings').patchValue($event.get('settings').value);

      this.emptyAccents();
      if ($event.get('settings').get('accents').value) {
        for (const accent of $event.get('settings').get('accents').value) {
          this.formAccents.push(new FormControl(accent));
        }
      }
    }
  }

  public filter(type: Tag): void {
    this.activeFilter = type;
    this.filteredTabs = type ? this.tabs.filter((tab: Tab) => tab.type === type.name) : this.tabs;
  }

  private emptyAccents(): void {
    while (this.formAccents.controls.length) {
      this.formAccents.removeAt(0);
    }
  }
}
