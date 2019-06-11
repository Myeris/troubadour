import { Component, Input, OnChanges } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnChanges {
  @Input() public isRunning: boolean;

  public timerValue = 0;

  private timer$: Observable<number>;
  private subscription: Subscription;
  private startTime = 0;

  ngOnChanges() {
    if (this.isRunning) {
      this.startTime = new Date().valueOf();

      this.timer$ = interval(1000).pipe(
        map(x => {
          this.timerValue = Math.floor((new Date().valueOf() - this.startTime) / 1000);
          return x;
        })
      );

      this.subscription = this.timer$.subscribe();
    }

    if (!this.isRunning && this.timerValue) {
      this.subscription.unsubscribe();
      this.startTime = 0;
      this.timerValue = 0;
    }
  }
}
