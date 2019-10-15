import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {AdminState} from '../../../../../stores/admin/admin.state';
import {LoadProfile} from '../../../../../stores/session/session.actions';
import {SessionState} from '../../../../../stores/session/session.state';
import {AuthTokensService} from '../../../../_app/_user/auth/services/auth-tokens.service';
import {UsersHttpService} from '../../../../_core/_services/api/http/users-http.service';
import {User} from '../../../../_core/_services/api/models/_interfaces/user.interface';
import {LocalStorageRef} from '../../../../_core/_services/universal/services/local-storage.universal.service';
import {NotificationService} from '../../../admin/services/notification.service';

@Component({
  selector: 'app-admin-user-actions',
  templateUrl: './user-actions.component.html'
})
export class UserActionsComponent {
  @Select(SessionState.user) loggedUser$: Observable<User>;
  @Select(AdminState.selectedUser) user$: Observable<User>;

  constructor(
    private localStorageRef: LocalStorageRef,
    private store: Store,
    public auth: AuthTokensService,
    private snackBar: MatSnackBar,
    private usersHttp: UsersHttpService,
    private notification: NotificationService,
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
    this.localStorageRef.setItem('who-was-I', previousUser.id);
    this.auth.setXasToken(user.id.toString());
    this.auth.setUserIdToken(user.id.toString());
    this.store.dispatch(new LoadProfile());
  }

  /**
   * Send an email to user with credentials
   */
  sendRecoveryEmail(user: User) {
    this.usersHttp.forgotPassword(user.email).subscribe(() => {
      this.notification.send('Email de réinitialisation envoyé à ' + user.email);
    });
  }

  /**
   * Edit user password into 123456
   */
  setPasswordTo123456(user: User) {
    this.usersHttp.edit(Object.assign(user, {password: '123456'})).subscribe(() => {
      this.notification.send('Mot de passe changé en 123456');
    });
  }

  /**
   * Clear the cache
   */
  clearCache(user) {
    this.usersHttp.clearUserCache(user).subscribe(t => {
      this.snackBar.open('Cache vidé', null, {duration: 3000});
    });
  }
}
