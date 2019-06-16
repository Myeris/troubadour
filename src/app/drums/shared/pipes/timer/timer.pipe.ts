import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {
  transform(value: number): any {
    if (value < 60) {
      return `00:${value < 10 ? '0' + value : value}`;
    }

    const mins: number = Math.floor(value / 60);
    const seconds: number = value - mins * 60;

    return `${mins < 10 ? '0' + mins : mins}:${seconds < 10 ? '0' + seconds : seconds}`;
  }
}
