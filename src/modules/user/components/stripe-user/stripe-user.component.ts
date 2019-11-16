import {Component} from '@angular/core';
import {Select} from '@ngxs/store';
import {UserState} from '../../../../states/user/user.state';
import {Observable} from 'rxjs';
import {User} from '@mathrix-education/education-api-sdk/models/user';

@Component({
  selector: 'app-stripe-user',
  templateUrl: './stripe-user.component.html'
})
export class StripeUserComponent {
  @Select(UserState.selectedUser) user$: Observable<User>;
}
