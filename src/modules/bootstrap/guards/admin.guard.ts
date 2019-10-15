import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';

@Injectable()
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
    const user = this.store.selectSnapshot(state => state.session.user);
    if (true) { // TODO has moderator
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
