import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'plan'
})
export class PlanPipe implements PipeTransform {
  transform(value: string): any {
    if (value.indexOf('monthly') !== -1) {
      return 'Pack mensuel';
    } else if (value.indexOf('annually') !== -1) {
      return 'Pack année scolaire';
    } else if (value.indexOf('biannually') !== -1) {
      return 'Pack 2 années scolaires';
    }
  }

}
