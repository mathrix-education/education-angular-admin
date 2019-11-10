import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTabGroup} from '@angular/material';
import {Select, Store} from '@ngxs/store';
import {AdminState} from '../../../../states/admin/admin.state';
import {UserHelper} from '../../../../states/user/User.helper';
import {TrainingState} from '../../../../states/training/training.state';
import {SetSelectedTab} from '../../../../states/training/training.action';

@Component({
  selector: 'app-training-page',
  templateUrl: './training-page.component.html',
  styleUrls: ['./training-page.component.scss'],
})
/**
 * Page to save/create blog-http posts
 */
export class TrainingPageComponent implements OnInit {
  /** The selected tab */
  @Select(TrainingState.selectedTab) selectedTab;
  /** The different tabs */
  @ViewChild('tabGroup', {static: true}) tabGroup: MatTabGroup;
  /** the tab policy */
  policy: any;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.selectPolicy();
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
    const user = this.store.selectSnapshot(AdminState.user);
    this.policy = UserHelper.hasAdminAccess(user) ? adminPolicy : moderatorPolicy;
  }

  selectedTabChange(tab: number) {
    this.store.dispatch(new SetSelectedTab(tab));
  }
}
