import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTabGroup} from '@angular/material';
import {Select, Store} from '@ngxs/store';
import {AdminState} from '../../../../states/admin/admin.state';
import {UserHelper} from '../../../../states/user/User.helper';
import {TrainingState} from '../../../../states/training/training.state';
import {SaveTrainingModule, SetSelectedTab} from '../../../../states/training/training.action';
import {map} from 'rxjs/operators';
import {ProductLesson} from '@mathrix-education/education-api-sdk/models/product';
import {Module} from '@mathrix-education/education-api-sdk/models/module';
import {Wall} from '@mathrix-education/silicate-core';

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
  /** The selected lesson */
  @Select(TrainingState.selectedLesson) selectedLesson;
  /** The different tabs */
  @ViewChild('tabGroup', {static: true}) tabGroup: MatTabGroup;
  /** the tab policy */
  policy: any;

  data = this.selectedLesson.pipe(map((lesson: ProductLesson & { module: Module }) => {
    return JSON.parse(lesson.module.content).silicate;
  }));

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

  save(data: Wall) {
    const lesson = this.store.selectSnapshot(TrainingState.selectedLesson);
    this.store.dispatch(new SaveTrainingModule({...lesson.module, ...{content: JSON.stringify(data)}}));
  }
}
