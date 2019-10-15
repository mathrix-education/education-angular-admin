import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'subscriptionStatus'})
export class SubscriptionStatusPipeStub implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}
