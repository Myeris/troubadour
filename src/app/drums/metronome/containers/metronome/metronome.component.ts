import { Component } from '@angular/core';
// app
import { MetronomeService } from '../../../shared/services/metronome/metronome.service';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.scss']
})
export class MetronomeComponent {

  constructor(private metronomeService: MetronomeService) {
    this.metronomeService.init();
  }

  public onPlay(form: { bpm: number, beat: number, note: number, subdivision: number, accents: number[] }): void {
    this.metronomeService.playMetronome(form);
  }

  public async onStop(): Promise<void> {
    await this.metronomeService.stop();
    await this.metronomeService.init();
  }

}
