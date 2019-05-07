import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(value: any, ...args: any[]): any {
    if (!args[1]) {
      return value;
    }

    const keys = args[0].split('.');

    // TODO avoid for in loop
    return value.filter((v: any) => {
      let obj = v;

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < keys.length; i++) {
        obj = obj[keys[i]];
      }

      if (typeof obj !== 'string') {
        return v;
      }

      return obj.toLowerCase().includes(args[1].toLowerCase());
    });
  }
}
