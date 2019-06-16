import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToCollection'
})
export class NumberToCollectionPipe implements PipeTransform {
  public transform(value: any, ...args: any[]): number[] {
    if (typeof value !== 'number') {
      throw new Error('Passed value must be a number');
    }

    const res = [];

    for (let i = 0; i < value; i++) {
      res.push(i);
    }

    return res;
  }
}
