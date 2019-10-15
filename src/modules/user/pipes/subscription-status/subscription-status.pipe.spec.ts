import {SubscriptionStatusPipe} from './subscription-status.pipe';

describe('SubscriptionStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new SubscriptionStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
