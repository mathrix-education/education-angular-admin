import {Component} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app--braintree-user',
  templateUrl: './braintree-user.component.html'
})
export class BraintreeUserComponent {
  @Select(AdminState.selectedUser) user$: Observable<User>;

  /**
   * Get the Braintree Customer URL
   */
  getCustomerUrl(user: User): string {
  }
}
