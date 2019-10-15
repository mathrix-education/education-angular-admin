import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {AdminState} from '../../../../../stores/admin/admin.state';
import {DeselectUser, SelectUser} from '../../../../../stores/admin/admin.state.actions';
import {User} from '../../../../_core/_services/api/models/_interfaces/user.interface';

@Component({
  selector: 'app-admin-user-profile-page',
  templateUrl: './admin-user-profile-page.component.html',
  styleUrls: ['./admin-user-profile-page.component.scss']
})
export class AdminUserProfilePageComponent implements OnInit {
  @Select(AdminState.selectedUser) user$: Observable<User>;

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
