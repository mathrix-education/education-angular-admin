import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {UserState} from '../../../../states/user/user.state';
import {User} from '@mathrix-education/education-api-sdk/models/user';
import {AdminState} from '../../../../states/admin/admin.state';

@Component({
  selector: 'app-admin-user-actions',
  templateUrl: './user-actions.component.html'
})
export class UserActionsComponent {
  @Select(AdminState.user) loggedUser$: Observable<User>;
  @Select(UserState.selectedUser) user$: Observable<User>;

  constructor(
    private store: Store,
  ) {
  }

  canUseAs(user: User) {
    return user.scopes.includes('users:as') || user.scopes.includes('*');
  }

  /**
   * Login as the given user
   * @param user: the user to be logged in
   */
  loginAs(user: User) {
    const previousUser = this.store.selectSnapshot(state => state.session.user);
    // this.localStorageRef.setItem('who-was-I', previousUser.id);
    // this.auth.setXasToken(user.id.toString());
    // this.auth.setUserIdToken(user.id.toString());
    // this.store.dispatch(new LoadProfile());
  }

  /**
   * Send an email to user with credentials
   */
  sendRecoveryEmail(user: User) {
    // this.usersHttp.forgotPassword(user.email).subscribe(() => {
    //   this.snackbar.open('Email de réinitialisation envoyé à ' + user.email);
    // });
  }

  /**
   * Edit user password into 123456
   */
  setPasswordTo123456(user: User) {
    // this.usersHttp.edit(Object.assign(user, {password: '123456'})).subscribe(() => {
    //   this.snackbar.open('Mot de passe changé en 123456');
    // });
  }

  /**
   * Clear the cache
   */
  clearCache(user) {
    // this.usersHttp.clearUserCache(user).subscribe(t => {
    //   this.snackBar.open('Cache vidé', null, {duration: 3000});
    // });
  }
}
