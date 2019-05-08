import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'noteCount'
})
export class NoteCountPipe implements PipeTransform {

  public transform(value: number, subdivision: number): string {
    if (subdivision === 4) {
      return (value + 1).toString();
    }

    if (subdivision === 8) {
      if (value % 2 === 1) {
        return '&';
      }

      switch (value) {
        case 0:
          return '1';
        case 2:
          return '2';
        case 4:
          return '3';
        case 6:
          return '4';
      }
    }

    if (subdivision === 16) {
      if (value % 4 === 1) {
        return 'e';
      }
      if (value % 4 === 2) {
        return '&';
      }
      if (value % 4 === 3) {
        return 'a';
      }

      switch (value) {
        case 0:
          return '1';
        case 4:
          return '2';
        case 8:
          return '3';
        case 12:
          return '4';
      }
    }
  }

}
