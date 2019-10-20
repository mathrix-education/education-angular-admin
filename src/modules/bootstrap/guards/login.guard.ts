import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {AdminState} from '../../../states/admin/admin.state';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store
  ) {
  }

  /**
   * Redirect if user is logged and not admin or moderator.
   * @return whether the user is allowed to go on the admin protected routes
   */
  canActivate(): boolean {
    console.log('activate login');
    if (!this.store.selectSnapshot(AdminState.user)) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
