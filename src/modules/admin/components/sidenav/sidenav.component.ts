import {Component, HostBinding, Input} from '@angular/core';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @HostBinding('class.floating') @Input() floating;

  /** the current logged user */
  // @Select(SessionState.user) user$: Observable<User>;


  // constructor(private auth: AuthTokensService, private store: Store) {
  // }


  /**
   * Log back an admin who was log as someone else
   */
  logBack() {
    // this.localStorageRef.setItem(environment.userIdToken, this.localStorageRef.getItem('who-was-I'));
    // this.auth.removeXasToken();
    // this.localStorageRef.removeItem('who-was-I');
    // this.store.dispatch(new LoadProfile());
  }

  /**
   * Assert that xAsToken exist (used to keep authToken private)
   */
  xAsTokenExist() {
    return false;
    // return this.auth.xAsExist();
  }

  /**
   * Assert that the user has enough privilege according to the modelNames given
   * @param modelNames the model allowed
   */
  allowed(modelNames: string[]): Observable<boolean> {

    let associatedScopes = [];
    modelNames.forEach(m => {
      associatedScopes = associatedScopes.concat([`${m}:read`, `${m}:delete`, `${m}:write`]);
    });
    return of(true);
    // return this.user$.pipe(map(u => {
    //   return (u.scopes) && (u.scopes.filter(value => associatedScopes.includes(value)).length > 0 || u.scopes.includes('*')
    //   );
    // }));
  }
}
