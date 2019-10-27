import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTabGroup} from '@angular/material';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {AdminState} from '../../../../states/admin/admin.state';
import {User} from '@mathrix-education/education-api-sdk/models/user';
import {UserHelper} from '../../../../states/user/User.helper';

@Component({
  selector: 'app-training-editor-page',
  templateUrl: './training-editor-page.component.html',
  styleUrls: ['./training-editor-page.component.scss'],
})
/**
 * Page to save/create blog-http posts
 */
export class TrainingEditorPageComponent implements OnInit {

  /** current user */
  @Select(AdminState.user) user$: Observable<User>;

  selected = {
    training: null,
    section: null,
    lesson: null,
  };

  selectedTabIndex = 0;

  policy;

  selectingOrders = ['training', 'section', 'lesson'];

  @ViewChild('tabGroup', {static: true}) tabGroup: MatTabGroup;


  ngOnInit() {
    //this.adminPage.editTitle('Formations');
    this.selectPolicy();
  }

  selectTab(index: number) {
    this.tabGroup.selectedIndex = index;
  }

  private selectPolicy() {
    const adminPolicy = {
      training: ['add', 'edit', 'delete', 'visible'],
      section: ['add', 'edit', 'delete', 'visible'],
      lesson: ['add', 'edit', 'delete', 'visible'],
    };

    const moderatorPolicy = {
      training: ['add', 'edit', 'delete', 'visible'],
      section: ['add', 'edit', 'delete', 'visible'],
      lesson: ['add', 'edit', 'delete', 'visible'],
    };

    this.user$.subscribe((user: User) => {
      this.policy = UserHelper.hasAdminAccess(user) ? adminPolicy : moderatorPolicy;
    });
  }


  selectedIndexChange(index: number) {
    this.selectedTabIndex = index;
  }


}
