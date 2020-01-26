import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Store} from '@ngxs/store';
import {Grade} from '@mathrix-education/education-api-sdk/models/grade';
import {BaseEditorComponent} from '../../../shared/components/base-editor/base-editor.component';
import {Empty} from '../../../shared/helpers/empty.helper';
import {GradesEndpoint} from '@mathrix-education/education-api-sdk';
import {EditTitle} from '../../../../states/admin/admin.actions';
import {PolicyEditor} from '@mathrix-education/rest-editor/interfaces/policy-editor.interface';
import {UserHelper} from '../../../../states/user/User.helper';
import {AdminState} from '../../../../states/admin/admin.state';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-content-creator-grade',
  templateUrl: './content-creator-grade.component.html'
})
export class ContentCreatorGradeComponent extends BaseEditorComponent<Grade> implements OnInit {

  addForm = this.formBuilder.group(Object.assign(Empty.getGrade(), {country_id: 1, order: 50}));
  displayedColumns = ['name', 'slug', 'visible', 'actions'];

  constructor(
    protected gradesHttp: GradesEndpoint,
    protected dialog: MatDialog,
    protected formBuilder: FormBuilder,
    private store: Store,
  ) {
    super(gradesHttp, gradesHttp.list(), formBuilder, dialog);
  }

  ngOnInit() {
    this.store.dispatch(new EditTitle('Contenu'));
    this.selectPolicy();
  }

  selectElement(grade: Grade) {
    // this.contentCreator.select('grade', grade);
    this.nextTab.emit();
  }

  private selectPolicy() {
    const adminPolicy: PolicyEditor = {
      add: false,
      edit: false,
      delete: false,
    };

    const moderatorPolicy: PolicyEditor = {
      add: false,
      edit: false,
      delete: false,
    };
    this.policy = UserHelper.hasAdminAccess(this.store.selectSnapshot(AdminState.user)) ? adminPolicy : moderatorPolicy;
  }
}
