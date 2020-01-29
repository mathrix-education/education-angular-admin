import {Component} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {UserState} from '../../../../states/user/user.state';
import {User} from '../../../../graphql/types/user';

@Component({
  selector: 'app-braintree-user',
  templateUrl: './braintree-user.component.html'
})
export class BraintreeUserComponent {
  @Select(UserState.selectedUser) user$: Observable<User>;

  /**
   * Get the Braintree Customer URL
   */
  getCustomerUrl(user: User): string {
    return '';
  }
}
