import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {BraintreeUserComponent} from './components/braintree-user/braintree-user.component';
import {StripeUserComponent} from './components/stripe-user/stripe-user.component';
import {SubscriptionsListComponent} from './components/subscriptions-list/subscriptions-list.component';
import {UserActionsComponent} from './components/user-actions/user-actions.component';
import {UserInfosComponent} from './components/user-infos/user-infos.component';
import {UserPurchasesListComponent} from './components/user-purchases-list/user-purchases-list.component';
import {SubscriptionStatusPipe} from './pipes/subscription-status/subscription-status.pipe';
import {ProfilePageComponent} from './pages/user-profile-page/profile-page.component';
import {PlanPipe} from './pipes/plan/plan.pipe';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {FlexModule} from '@angular/flex-layout';
import {UsersTablePageComponent} from './pages/users-table-page/users-table-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {SafePipe} from './pipes/safe/safe.pipe';
import {Route, RouterModule} from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const routes: Route[] = [
  {
    path: '',
    component: UsersTablePageComponent
  },
  {
    path: ':id',
    component: ProfilePageComponent
  }
];


@NgModule({
  declarations: [
    BraintreeUserComponent,
    StripeUserComponent,
    SubscriptionsListComponent,
    SubscriptionStatusPipe,
    PlanPipe,
    UserActionsComponent,
    UserInfosComponent,
    UserPurchasesListComponent,
    UsersTablePageComponent,
    ProfilePageComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    FlexModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressBarModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule.forChild(routes)
  ],
  providers: [DatePipe]
})

export class UserModule {
}
