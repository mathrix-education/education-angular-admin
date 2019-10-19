import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Select, State, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {UserState} from '../../../../states/user/user.state';
import {User} from '@mathrix-education/education-api-sdk/models/user';
import {Subscription} from '@mathrix-education/education-api-sdk/models/subscription';
import {SelectUserSubscriptions} from '../../../../states/user/user.actions';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscriptions-list.component.html',
})
export class SubscriptionsListComponent implements OnInit {
  @Select(UserState.selectedUser) user$: Observable<User>;
  @Select(UserState.selectedUserSubscriptions) subscriptions$: Observable<Subscription[]>;

  constructor(private route: ActivatedRoute, private store: Store) {
  }

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.store.dispatch(new SelectUserSubscriptions(+this.route.snapshot.params.id));
    }
  }

  subscriptionUrl(subscription: Subscription): string {
    if (subscription.type === 'braintree') {
      return `${environment.braintreeUrl}/merchants/${environment.braintreeMerchantId}/subscriptions/${subscription.id}`;
    } else {
      return `https://dashboard.stripe.com/subscriptions/${subscription.id}`;
    }
  }
}
