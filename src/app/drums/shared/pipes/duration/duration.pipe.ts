import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  public transform(value: any, ...args: any[]): string | any {
    if (!value || typeof value !== 'number') {
      return value;
    }

    if (value < 60) {
      return `${value} second${value === 1 ? '' : 's'}`;
    }

    return `${Math.floor(value / 60)} minute${value === 60 ? '' : 's'}`;
  }
}
