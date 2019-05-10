import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  public transform(value: any, ...args: any[]): string | any {
    if (value === null || typeof value !== 'string') {
      return value;
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
