import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {DeselectUser, SelectUser} from '../../../../states/user/user.actions';
import {UserState} from '../../../../states/user/user.state';
import {Observable} from 'rxjs';
import {User} from '@mathrix-education/education-api-sdk/models/user';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  @Select(UserState.selectedUser) user$: Observable<User>;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store) {
  }

  ngOnInit() {
    // Select the user
    if (this.route.snapshot.params.id) {
      this.store.dispatch(new SelectUser(+this.route.snapshot.params.id));
    } else {
      this.back();
    }
  }

  back() {
    this.store.dispatch(new DeselectUser());
    this.router.navigate(['admin', 'users']);
  }
}
