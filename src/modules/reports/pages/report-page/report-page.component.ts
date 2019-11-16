import {Component, OnInit} from '@angular/core';
import {BaseEditorComponent} from '../../../shared/components/base-editor/base-editor.component';
import {Report} from '@mathrix-education/education-api-sdk/models/report';
import {PaginatedResponse, ReportsEndpoint} from '@mathrix-education/education-api-sdk';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngxs/store';
import {of} from 'rxjs';
import {PolicyEditor} from '@mathrix-education/rest-editor/interfaces/policy-editor.interface';
import {map, tap} from 'rxjs/operators';
import {UserHelper} from '../../../../states/user/User.helper';
import {AdminState} from '../../../../states/admin/admin.state';


class DisplayService {
}

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html'
})
/**
 * To see reports and editSize status
 */
export class ReportPageComponent extends BaseEditorComponent<Report> implements OnInit {
  displayedColumns = ['content', 'type', 'status', 'actions'];

  constructor(
    private store: Store,
    protected reportsHttp: ReportsEndpoint,
    protected dialog: MatDialog,
    protected formBuilder: FormBuilder) {
    super(reportsHttp, reportsHttp.list(), formBuilder, dialog);
  }

  ngOnInit() {
    this.selectPolicy();
    this.resetIndex();
    this.reloadData();
  }

  private selectPolicy() {
    const adminPolicy: PolicyEditor = {
      add: false,
      edit: true,
      delete: true,
    };

    const moderatorPolicy: PolicyEditor = {
      add: false,
      edit: false,
      delete: false,
    };
    this.policy = UserHelper.hasAdminAccess(this.store.selectSnapshot(AdminState.user)) ? adminPolicy : moderatorPolicy;
  }

  selectElement(element) {
    // this.display.showModuleEditor(element.module);
  }


}
