import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {SaveSelectedUser, SetSelectedUser} from '../../../../states/user/user.actions';
import {UsersEndpoint} from '@mathrix-education/education-api-sdk';
import {UserState} from '../../../../states/user/user.state';
import {AdminState} from '../../../../states/admin/admin.state';
import {MatSnackBar} from '@angular/material/snack-bar';
import {scopesList, simplifiedScopes} from './simplified.scopes';
import {UserHelper} from '../../../../states/user/User.helper';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../../../graphql/types/user';


/**
 * Edit user infos
 */
@Component({
  selector: 'app-admin-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent implements OnInit {

  UserHelper = UserHelper;

  /** can edit */
  @Input() editMode: boolean;

  @Select(AdminState.user) loggedUser$: Observable<User>;
  @Select(UserState.selectedUser) user$: Observable<User>;

  @ViewChild('customScopes', {static: false}) customScopesTemplate;

  scopesModel: { scope: string, selected: boolean }[];
  /** A list of simplified scopes for the admin panel */
  simplifiedScopesModel = simplifiedScopes;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private usersEndpoint: UsersEndpoint,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.initScopes();
    this.refreshScopes();
  }

  /**
   * Assert that selected user has all the required scope for a group of scopes.
   * @param scopes: the group of scopes
   */
  selectedUserHasAllScopes(scopes: string[]) {
    const user = this.store.selectSnapshot(UserState.selectedUser);
    if (user.scopes && user.scopes.includes('*')) {
      return true;
    }

    for (const scope of scopes) {
      if (!user.scopes.includes(scope)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Toggle or Untoggle the edit mode.
   */
  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.save();
    }
  }

  /**
   * Trigger save action if any change has been made.
   */
  save() {
    this.store.dispatch(new SaveSelectedUser()).subscribe(() => {
      this.snackbar.open('Utilisateur sauvegardé', null, {duration: 2500});
    });
  }


  initScopes() {
    this.scopesModel = scopesList.map(scope => {
      return {scope, selected: this.selectedUserHasAllScopes([scope])};
    });
  }

  /**
   * Update the permissions of user.
   */
  refreshScopes() {
    const user = this.store.selectSnapshot(UserState.selectedUser);
    user.scopes = this.scopesModel.filter(s => s.selected).map(s => s.scope);
    this.simplifiedScopesModel.forEach(scopeEntity => {
      scopeEntity.selected = this.selectedUserHasAllScopes(scopeEntity.scopes);
    });
  }

  /**
   * Update scopeModel when user select a simplified scope.
   */
  refreshSimplifiedScopes() {
    const scopesModelCopy = [...this.scopesModel];
    this.simplifiedScopesModel.forEach((scopeEntities) => { // for each group of scopes we add the permissions or remove the permissions
      scopeEntities.scopes.forEach((scopeName) => {
        const foundScopeIndex = scopesModelCopy.findIndex(s => s.scope === scopeName);
        if (foundScopeIndex !== -1) {
          scopesModelCopy[foundScopeIndex].selected = scopeEntities.selected;
        }
      });
    });
    this.scopesModel = [...scopesModelCopy];
    const newScopes = this.scopesModel.filter(sm => sm.selected).map(sm => sm.scope);
    this.patch('scopes', newScopes);
  }

  openCustomScopesDialog() {
    this.dialog.open(this.customScopesTemplate);
  }

  /**
   * Patch a property of the selected user.
   * @param property The property to patch.
   * @param value The value to patch.
   */
  patch(property, value) {
    const patch = {};
    patch[property] = value;

    this.store.dispatch(new SetSelectedUser({
      ...this.store.selectSnapshot(UserState.selectedUser),
      ...patch
    }));
  }
}
