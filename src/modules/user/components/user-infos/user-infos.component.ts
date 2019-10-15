import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, first, map, switchMap, tap} from 'rxjs/operators';
import {AdminState} from '../../../../../stores/admin/admin.state';
import {SetSelectedUser} from '../../../../../stores/admin/admin.state.actions';
import {SessionState} from '../../../../../stores/session/session.state';
import {UsersHttpService} from '../../../../_core/_services/api/http/users-http.service';
import {UserHelper} from '../../../../_core/_services/api/models/_interfaces/user.helper';
import {User} from '../../../../_core/_services/api/models/_interfaces/user.interface';
import {NotificationService} from '../../../admin/services/notification.service';


/**
 * Edit user infos
 */
@Component({
  selector: 'app-admin-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent implements OnInit, OnDestroy {
  /** can edit */
  @Input() editMode: boolean;

  @Select(SessionState.user) loggedUser$: Observable<User>;
  @Select(AdminState.selectedUser) user$: Observable<User>;

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
          this.simplifiedScopesModel[key].selected = this.userHasAllScopes(user, this.simplifiedScopesModel[key].scopes);
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
    tap(() => this.notification.send('Mise à jour réussie'))
  );
  /** The debounce subscription */
  private debounce;

  /** access userHelper static methods in view*/ // TODO V5: To be removed and use store selector instead
  UserHelper = UserHelper;

  scopesModel: { scope: string, selected: boolean }[];
  /**simplifiedScopesModel: a list of simplified scopes for the admin panel */
  simplifiedScopesModel = [
    {group: 'Super Administrateur', scopes: ['*'], selected: false},
    {group: 'Utilisateur', scopes: ['users:read', 'users:write', 'users:delete'], selected: false},
    {
      group: 'Commentaires',
      scopes: ['comments:read', 'comments:write', 'comments:delete', 'reports:delete', 'reports:read', 'reports:write'],
      selected: false
    },
    {
      group: 'Contenu',
      scopes: ['grades:delete', 'grades:write', 'disciplines:delete', 'disciplines:write',
        'activities:delete', 'activities:read', 'activities:write',
        'chapters:delete', 'chapters:read', 'chapters:write',
        'files:delete', 'files:read', 'files:write',
        'modules:delete', 'modules:read', 'modules:write', 'notions:delete',
        'notions:read', 'notions:write'], selected: false
    },
    {
      group: 'Blog',
      scopes: ['posts:delete', 'posts:get', 'posts:write', 'categories:delete', 'categories:write', 'categories:read'],
      selected: false
    },
    {group: 'Formations', scopes: ['products:delete', 'products:read', 'products:write'], selected: false},
    {group: 'Live', scopes: ['settings:read', 'settings:write'], selected: false},
    {group: 'Réductions', scopes: ['discounts:delete', 'discounts:read', 'discounts:write'], selected: false},
  ];


  constructor(
    private store: Store,
    private dialog: MatDialog,
    private usersHttp: UsersHttpService,
    private notification: NotificationService,
  ) {
  }

  ngOnInit(): void {
    // Load the application scopes
    this.usersHttp.scopes().pipe(first()).subscribe(response => {
      this.scopes = response.data;
      this.debounce = this.debounce$.subscribe(u => console.log(u));
    });
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
        scopeEntity.selected = this.userHasAllScopes(user, scopeEntity.scopes);
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


  /**
   * Assert that user has all the required scope for a group of scopes
   * @param user
   * @param scopes: the group of scopes
   */
  userHasAllScopes(user: User, scopes: string[]) {
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

  openCustomScopesDialog() {
    this.dialog.open(this.customScopesTemplate);
  }

  patch(property, value) {
    const patch = {};
    patch[property] = value;

    this.store.dispatch(new SetSelectedUser({
      ...this.store.selectSnapshot(AdminState.selectedUser),
      ...patch
    }));
  }


  /**
   * Edit user
   * @param user
   */
  edit(user: User): Observable<User> {
    const payload = {...user};
    delete payload.created_at;
    delete payload.updated_at;

    const patchedScopes = this.scopesModel.filter(s => s.selected).map(s => s.scope);
    payload.scopes = patchedScopes.includes('*') ? ['*'] : patchedScopes;

    return this.usersHttp.edit<User>(payload).pipe(
      tap(response => {
        this.store.dispatch(new SetSelectedUser(response.data));
      }),
      map(response => response.data)
    );
  }
}
