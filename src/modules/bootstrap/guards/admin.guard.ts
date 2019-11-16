import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {UserHelper} from '../../../states/user/User.helper';
import {AdminState} from '../../../states/admin/admin.state';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

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
    const user = this.store.selectSnapshot(AdminState.user);
    if (UserHelper.hasModeratorAccess(user)) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
