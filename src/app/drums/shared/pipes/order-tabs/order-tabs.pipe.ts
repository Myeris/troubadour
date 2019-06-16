import { Pipe, PipeTransform } from '@angular/core';
// app
import { Tab } from '../../models/tab.model';
import { Tag } from '../../models/tag.model';

@Pipe({
  name: 'orderTabs'
})
export class OrderTabsPipe implements PipeTransform {
  public transform(value: Tab[], args: Tag[]): Tab[] {
    if (value && args) {
      // assign a type object to every tab (useful for sorting)
      value.forEach(v => {
        const typeObject = args.filter(t => t.name === v.type);
        v.typeObject = typeObject[0];
      });

      // sort tabs
      value.sort((a, b) => {
        // sort by type weight
        if (a.typeObject.weight < b.typeObject.weight) {
          return -1;
        }
        if (a.typeObject.weight > b.typeObject.weight) {
          return 1;
        }

        // sort exercise by type
        if (a.type < b.type) {
          return -1;
        }
        if (a.type > b.type) {
          return 1;
        }

        // then sort exercise alphabetically
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
      });
    }

    return value;
  }
}
