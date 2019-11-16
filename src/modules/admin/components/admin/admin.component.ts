import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AdminState, AdminTitle} from '../../../../states/admin/admin.state';
import {Select} from '@ngxs/store';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  /** the title of the selected tab */
  @Select(AdminState.title) title$: Observable<AdminTitle>;
  sideMenuOpened = false;

  /**
   * Toggle or untoggle the sidenav menu
   */
  toggleMenu() {
    this.sideMenuOpened = !this.sideMenuOpened;
  }

  /**
   * Close the sidenav menu
   */
  closeMenu() {
    this.sideMenuOpened = false;
  }
}
