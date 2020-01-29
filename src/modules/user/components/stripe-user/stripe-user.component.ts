import {Component} from '@angular/core';
import {Select} from '@ngxs/store';
import {UserState} from '../../../../states/user/user.state';
import {Observable} from 'rxjs';
import {User} from '../../../../graphql/types/user';

@Component({
  selector: 'app-stripe-user',
  templateUrl: './stripe-user.component.html'
})
export class StripeUserComponent {
  @Select(UserState.selectedUser) user$: Observable<User>;
}
