import {Component} from '@angular/core';
import {Select} from '@ngxs/store';
import {AdminState} from '../../../../../stores/admin/admin.state';

@Component({
  selector: 'app-stripe-user',
  templateUrl: './stripe-user.component.html'
})
export class StripeUserComponent {
  // @Select(AdminState.selectedUser) user$: Observable<User>;
}
