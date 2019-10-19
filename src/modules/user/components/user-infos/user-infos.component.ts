import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {SetSelectedUser} from '../../../../states/user/user.actions';
import {User} from '@mathrix-education/education-api-sdk/models/user';
import {UsersEndpoint} from '@mathrix-education/education-api-sdk';
import {UserState} from '../../../../states/user/user.state';
import {AdminState} from "../../../../states/admin/admin.state";
import {MatSnackBar} from "@angular/material/snack-bar";
import {simplifiedScopes} from "./simplified.scopes";
import {UserHelper} from '../../../../states/user/User.helper';


/**
 * Edit user infos
 */
@Component({
  selector: 'app-admin-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent implements OnInit, OnDestroy {

  UserHelper = UserHelper;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private usersEndpoint: UsersEndpoint,
    private snackbar: MatSnackBar
  ) {
  }

  /** can edit */
  @Input() editMode: boolean;

  @Select(AdminState.user) loggedUser$: Observable<User>;
  @Select(UserState.selectedUser) user$: Observable<User>;

  @ViewChild('customScopes', {static: false}) customScopesTemplate;

  private scopes: string[] = [];
  private watchingFields = ['firstname', 'lastname', 'username', 'email'];

  /** Debounce the user edit */
  private debounce$ = this.user$.pipe(
    filter(user => user !== null),
    tap(user => {
      this.scopesModel = this.scopes.map(s => {
        return {scope: s, selected: user.scopes.includes(s)}; // {scope_name: boolean}
      });
      this.scopesModel.push({scope: '*', selected: user.scopes.includes('*')});
      Object.keys(this.simplifiedScopesModel).forEach(
        key => {
          this.simplifiedScopesModel[key].selected = UserInfosComponent.userHasAllScopes(user, this.simplifiedScopesModel[key].scopes);
        }
      );
    }),
    debounceTime(1000),
    distinctUntilChanged((previous: User, current: User) => {
      // Check watching field
      for (const field of this.watchingFields) {
        if (previous[field] !== current[field]) {
          return false;
        }
      }

      // Then check the scopes
      return JSON.stringify([...previous.scopes].sort()) === JSON.stringify([...current.scopes].sort());
    }),
    filter(() => this.editMode),
    switchMap((user: User) => this.edit(user)),
    tap(() => this.snackbar.open('Mise à jour réussie'))
  );
  /** The debounce subscription */
  private debounce;

  scopesModel: { scope: string, selected: boolean }[];
  /** A list of simplified scopes for the admin panel */
  simplifiedScopesModel = simplifiedScopes;


  /**
   * Assert that user has all the required scope for a group of scopes
   * @param user the user
   * @param scopes: the group of scopes
   */
  static userHasAllScopes(user: User, scopes: string[]) {
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

  ngOnInit(): void {
    // Load the application scopes
    // this.usersEndpoint.read().pipe(first()).subscribe(response => {
    //   this.scopes = response.data;
    //   this.debounce = this.debounce$.subscribe(u => console.log(u));
    // });
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }


  /**
   * Update the permissions of user (also update smartScopes)
   */
  refreshScopes(user: User) {
    user.scopes = this.scopesModel.filter(s => s.selected).map(s => s.scope);
    this.simplifiedScopesModel.forEach(
      scopeEntity => {
        scopeEntity.selected = UserInfosComponent.userHasAllScopes(user, scopeEntity.scopes);
      }
    );
  }

  /**
   * Update scopeModel when user select a smart scope ( a simplified scope)
   */
  refreshSimplifiedScopes() {
    const scopesModelCopy = [...this.scopesModel];
    this.simplifiedScopesModel.forEach( // for each group of scopes we add the permissions or remove the permissions
      (scopeEntity) => {
        scopeEntity.scopes.forEach((scopeName) => {
            const foundScopeIndex = scopesModelCopy.findIndex(s => s.scope === scopeName);
            if (foundScopeIndex !== -1) {
              scopesModelCopy[foundScopeIndex].selected = scopeEntity.selected;
            }
          }
        );
      }
    );
    this.scopesModel = [...scopesModelCopy];

    const newScopes = this.scopesModel.filter(sm => sm.selected).map(sm => sm.scope);
    console.log(newScopes);
    this.patch('scopes', newScopes);
  }

  openCustomScopesDialog() {
    this.dialog.open(this.customScopesTemplate);
  }

  patch(property, value) {
    const patch = {};
    patch[property] = value;

    this.store.dispatch(new SetSelectedUser({
      ...this.store.selectSnapshot(UserState.selectedUser),
      ...patch
    }));
  }


  /**
   * Edit user
   * @param user The user to edit.
   */
  edit(user: User): Observable<User> {
    const payload = {...user};
    delete payload.created_at;
    delete payload.updated_at;

    const patchedScopes = this.scopesModel.filter(s => s.selected).map(s => s.scope);
    payload.scopes = patchedScopes.includes('*') ? ['*'] : patchedScopes;

    return this.usersEndpoint.update(user.id, user).pipe(
      tap(response => {
        this.store.dispatch(new SetSelectedUser(response.data));
      }),
      map(response => response.data)
    );
  }
}
