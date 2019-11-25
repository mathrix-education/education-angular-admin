import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Store} from '@ngxs/store';
import {Empty} from '../../../../../../helpers/empty.helper';
import {SessionState} from '../../../../../../stores/session/session.state';
import {ChaptersHttpService} from '../../../../../_core/_services/api/http/chapters-http.service';
import {DisciplinesHttpService} from '../../../../../_core/_services/api/http/disciplines-http.service';
import {Discipline} from '../../../../../_core/_services/api/models/_interfaces/discipline.interface';
import {UserHelper} from '../../../../../_core/_services/api/models/_interfaces/user.helper';
import {ChainHttpService} from '../../../../../_core/_services/api/http/chain-http.service';
import {PolicyEditor} from '../../../../rest-editor/interfaces/policy-editor.interface';
import {AdminPageService} from '../../../services/admin-page.service';
import {ContentCreatorService} from '../../../services/content-creator.service';
import {BaseEditorComponent} from '../../base-editor/base-editor.component';


@Component({
  selector: 'app-content-creator-discipline',
  templateUrl: './content-creator-discipline.component.html'
})
export class ContentCreatorDisciplineComponent extends BaseEditorComponent implements OnInit {
  addForm = this.formBuilder.group(Empty.getDiscipline());
  displayedColumns = ['name', 'actions'];

  availableDisciplines$ = this.disciplinesHttp.index<Discipline>(0, 100);

  constructor(
    private adminPage: AdminPageService,
    protected disciplinesHttp: DisciplinesHttpService,
    protected chaptersHttp: ChaptersHttpService,
    private contentCreator: ContentCreatorService,
    private store: Store,
    protected dialog: MatDialog,
    protected formBuilder: FormBuilder,
    protected chainHttp: ChainHttpService
  ) {
    super(disciplinesHttp.byGrade(contentCreator.selected.grade, true), disciplinesHttp, formBuilder, dialog, chainHttp);
  }

  ngOnInit() {
    this.selectPolicy();
  }

  selectElement(discipline: Discipline) {
    this.contentCreator.select('discipline', discipline);
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

    this.policy = UserHelper.hasAdminAccess(this.store.selectSnapshot(SessionState.user)) ? adminPolicy : moderatorPolicy;
  }

  addExistingDiscipline(discipline: Discipline) {
    this.chaptersHttp.add({
      name: 'Nouveau chapitre',
      slug: 'nouveau-chapitre',
      grade_id: this.contentCreator.selected.grade.id,
      order: 0,
      visible: false,
      discipline_id: discipline.id
    }).subscribe(() => {
      this.reloadData();
    });
  }
}
