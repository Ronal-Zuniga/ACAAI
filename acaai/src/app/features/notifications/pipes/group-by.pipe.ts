import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy',
  standalone: false
})
export class GroupByPipe implements PipeTransform {
  transform(collection: any[], property: string): { [key: string]: any[] } {
    if (!collection) {
      return {};
    }

    return collection.reduce((groups: { [key: string]: any[] }, item: any) => {
      const key = item[property];
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {});
  }
} 