import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-to-failure-result',
  templateUrl: './to-failure-result.component.html',
  styleUrls: ['./to-failure-result.component.scss']
})
export class ToFailureResultComponent implements OnChanges {
  public newBpm: number;
  public feedback: string;

  @Input() public bpm: number;
  @Output() public cancelled: EventEmitter<void> = new EventEmitter<void>();
  @Output() public highscored: EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (this.bpm) {
      this.newBpm = this.bpm;
    }
  }

  public saveHighscore(): void {
    if (this.newBpm > this.bpm) {
      this.feedback = 'Oh come one... No one likes a cheater.';
      return;
    }

    this.feedback = null;

    this.highscored.emit(this.newBpm);
  }

  public cancel(): void {
    this.cancelled.emit();
  }
}
