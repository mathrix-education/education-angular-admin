import {Component} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {UserState} from '../../../../states/user/user.state';
import {Subscription} from '@mathrix-education/education-api-sdk/models/subscription';
import {environment} from '../../../../environments/environment';
import {User} from '../../../../graphql/types/user';

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscriptions-list.component.html',
})
export class SubscriptionsListComponent {
  /** The selected user */
  @Select(UserState.selectedUser) user$: Observable<User>;
  /** The selected user's subscriptions. */
  @Select(UserState.selectedUserSubscriptions) subscriptions$: Observable<Subscription[]>;


  /**
   * Return the url associated with a subscription.
   * @param subscription The subscription.
   */
  subscriptionUrl(subscription: Subscription): string {
    if (subscription.type === 'braintree') {
      return `${environment.braintreeUrl}/merchants/${environment.braintreeMerchantId}/subscriptions/${subscription.id}`;
    } else {
      return `https://dashboard.stripe.com/subscriptions/${subscription.id}`;
    }
  }
}
