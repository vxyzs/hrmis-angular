import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumBy'
})
export class SumByPipe implements PipeTransform {
  transform(items: any[], property: string): number {
    if (!items || !items.length) {
      return 0;
    }
    return items.reduce((sum, item) => sum + (item[property] || 0), 0);
  }
}
