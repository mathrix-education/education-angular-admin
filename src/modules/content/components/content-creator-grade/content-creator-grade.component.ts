import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Store} from '@ngxs/store';
import {map} from 'rxjs/operators';
import {Grade} from '@mathrix-education/education-api-sdk/models/grade';
import {BaseEditorComponent} from '../../../shared/components/base-editor/base-editor.component';
import {Empty} from '../../../shared/helpers/empty.helper';


@Component({
  selector: 'app-content-creator-grade',
  templateUrl: './content-creator-grade.component.html'
})
export class ContentCreatorGradeComponent extends BaseEditorComponent<Grade> implements OnInit {

  addForm = this.formBuilder.group(Object.assign(Empty.getGrade(), {country_id: 1, order: 50}));
  displayedColumns = ['name', 'slug', 'visible', 'actions'];

  constructor(
    protected gradesHttp: GradesHttpService,
    protected dialog: MatDialog,
    protected formBuilder: FormBuilder,
    private adminPage: AdminPageService,
    private store: Store,
    private contentCreator: ContentCreatorService,
    protected chainHttp: ChainHttpService
  ) {
    super(gradesHttp.index(), gradesHttp, formBuilder, dialog, chainHttp);
  }

  ngOnInit() {
    this.adminPage.editTitle('Classes');
    this.selectPolicy();
  }

  selectElement(grade: Grade) {
    this.contentCreator.select('grade', grade);
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
    this.policy = UserHelper.hasAdminAccess(this.store.selectSnapshot(SessionState.user)) ? adminPolicy : moderatorPolicy;
  }
}
