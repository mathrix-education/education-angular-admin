import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Store} from '@ngxs/store';
import {ChaptersEndpoint, DisciplinesEndpoint} from '@mathrix-education/education-api-sdk';
import {Discipline} from '@mathrix-education/education-api-sdk/models/discipline';
import {Empty} from '../../../shared/helpers/empty.helper';
import {BaseEditorComponent} from '../../../shared/components/base-editor/base-editor.component';
import {PolicyEditor} from '@mathrix-education/rest-editor/interfaces/policy-editor.interface';
import {UserHelper} from '../../../../states/user/User.helper';
import {AdminState} from '../../../../states/admin/admin.state';


@Component({
  selector: 'app-content-creator-discipline',
  templateUrl: './content-creator-discipline.component.html'
})
export class ContentCreatorDisciplineComponent extends BaseEditorComponent<Discipline> implements OnInit {
  addForm = this.formBuilder.group(Empty.getDiscipline());
  displayedColumns = ['name', 'actions'];

  availableDisciplines$ = this.disciplinesEndpoint.list();

  constructor(
    protected disciplinesEndpoint: DisciplinesEndpoint,
    private store: Store,
    protected dialog: MatDialog,
    protected formBuilder: FormBuilder,
  ) {
    super(disciplinesEndpoint, disciplinesEndpoint.list(), formBuilder, dialog);
  }

  ngOnInit() {
    this.selectPolicy();
  }

  selectElement(discipline: Discipline) {
    // this.contentCreator.select('discipline', discipline);
    this.nextTab.emit();
  }

  private selectPolicy() {
    const adminPolicy: PolicyEditor = {
      add: true,
      edit: false,
      delete: false
    };

    const moderatorPolicy: PolicyEditor = {
      add: false,
      edit: false,
      delete: false
    };

    this.policy = UserHelper.hasAdminAccess(this.store.selectSnapshot(AdminState.user)) ? adminPolicy : moderatorPolicy;
  }

  addExistingDiscipline(discipline: Discipline) {
    // this.chaptersHttp.create({
    //   name: 'Nouveau chapitre',
    //   slug: 'nouveau-chapitre',
    //   grade_id: this.contentCreator.selected.grade.id,
    //   order: 0,
    //   visible: false,
    //   discipline_id: discipline.id
    // }).subscribe(() => {
    //   this.reloadData();
    // });
  }
}
