import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(value: any, ...args: any[]): any {
    if (!args[1]) {
      return value;
    }

    const key: string = args[0];
    const search = args[1];

    return value.filter(v => v[key].toLowerCase().includes(search.toLowerCase()));
  }
}
