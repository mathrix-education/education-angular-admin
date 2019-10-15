import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  title = 'education-angular-admin';
  sideMenuOpened = false;
  title$: Observable<string>;


  ngOnInit() {
    // this.title$ = this.adminPage.title$.pipe(
    //   // delay to avoid ExpressionChanged error
    //   delay(0));
  }

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
