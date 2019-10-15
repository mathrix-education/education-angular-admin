import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import {AdminState} from '../../../../../stores/admin/admin.state';
import {SelectUserSubscriptions} from '../../../../../stores/admin/admin.state.actions';
import {User} from '../../../../_core/_services/api/models/_interfaces/user.interface';
import {Subscription} from '../../../../_core/_services/api/models/_interfaces/subscription.model';

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscriptions-list.component.html',
})
export class SubscriptionsListComponent implements OnInit {
  @Select(AdminState.selectedUser) user$: Observable<User>;
  @Select(AdminState.selectedUserSubscriptions) subscriptions$: Observable<Subscription[]>;

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
