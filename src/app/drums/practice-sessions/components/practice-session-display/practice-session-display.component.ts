import {Component, Input, OnChanges} from '@angular/core';
// app
import {Tab} from '../../../shared/models/tab.model';
import {PracticeSession} from '../../../shared/models/practice-session.model';
import {Exercise} from '../../../shared/models/exercise.model';
import {MetronomeService} from '../../../shared/services/metronome/metronome.service';

@Component({
  selector: 'app-practice-session-display',
  templateUrl: './practice-session-display.component.html',
  styleUrls: ['./practice-session-display.component.scss']
})
export class PracticeSessionDisplayComponent implements OnChanges {
  @Input() public session: PracticeSession;
  @Input() public tabs: Tab[];

  public inPlayIndex = 0;
  public playTime = 0;
  public state = 'stopped';

  constructor(private metronomeService: MetronomeService) {
    this.metronomeService.init();
  }

  ngOnChanges() {
    this.assignTab();
  }

  public async play(): Promise<void> {
    if (this.state === 'running') {
      await this.stop();
    }

    this.state = 'running';

    for (let i = this.inPlayIndex; i < this.session.exercises.length; i++) {
      this.inPlayIndex = i;

      this.scrollIntoView();
      await this.metronomeService.playExercise(this.session.exercises[i]);

      // when all exercises have been played, reset the params
      if (i === this.session.exercises.length - 1) {
        this.reset();
        this.state = 'stopped';
      }
    }
  }

  public async playPause(): Promise<void> {
    switch (this.state) {
      case 'running':
        await this.metronomeService.pause();
        this.state = 'suspended';
        break;
      case 'suspended':
        await this.metronomeService.resume();
        this.state = 'running';
        break;
      case 'stopped':
        await this.play();
        break;
      default:
        break;
    }
  }

  public async stop(): Promise<void> {
    await this.metronomeService.stop();
    this.state = 'stopped';
    await this.metronomeService.init();
  }

  public async playNext(): Promise<void> {
    const wasPlaying = this.state === 'running';
    await this.stop();
    if (this.inPlayIndex === (this.session.exercises.length - 1)) {
      return;
    }
    this.inPlayIndex = this.inPlayIndex + 1;
    if (wasPlaying) {
      await this.play();
    } else {
      this.scrollIntoView();
    }
  }

  public async playPrevious(): Promise<void> {
    const wasPlaying = this.state === 'running';
    await this.stop();
    if (this.inPlayIndex === 0) {
      return;
    }
    this.inPlayIndex = this.inPlayIndex - 1;
    if (wasPlaying) {
      await this.play();
    } else {
      this.scrollIntoView();
    }
  }

  public changeVolume(event: any): void {
    this.metronomeService.changeVolume(event.target);
  }

  public scrollIntoView(): void {
    document.getElementById(`exercise-${this.inPlayIndex}`).scrollIntoView({behavior: 'smooth'});
  }

  private reset(): void {
    this.state = 'stopped';
    this.inPlayIndex = 0;
    this.playTime = 0;
    this.scrollIntoView();
  }

  private assignTab() {
    if (this.session.exercises.length > 0) {
      console.log('hein');
      this.session.exercises
        .map((exercise: Exercise) => exercise.tab = this.tabs.find((tab: Tab) => tab.$key === exercise.tabRef));
    }
  }
}
