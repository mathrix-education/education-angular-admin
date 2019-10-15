import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BraintreeUserComponent} from './components/braintree-user/braintree-user.component';
import {StripeUserComponent} from './components/stripe-user/stripe-user.component';
import {SubscriptionsListComponent} from './components/subscriptions-list/subscriptions-list.component';
import {UserActionsComponent} from './components/user-actions/user-actions.component';
import {UserInfosComponent} from './components/user-infos/user-infos.component';
import {UserPurchasesListComponent} from './components/user-purchases-list/user-purchases-list.component';


@NgModule({
  declarations: [
    BraintreeUserComponent,
    StripeUserComponent,
    SubscriptionsListComponent,
    UserActionsComponent,
    UserInfosComponent,
    UserPurchasesListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule {
}
