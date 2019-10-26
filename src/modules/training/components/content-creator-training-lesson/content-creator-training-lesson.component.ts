import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {map} from 'rxjs/operators';
import {ArrayHelper} from '../../../../../../helpers/array.helper';
import {Empty} from '../../../../../../helpers/empty.helper';
import {ModulesHttpService} from '../../../../../_core/_services/api/http/modules-http.service';
import {ProductsHttpService} from '../../../../../_core/_services/api/http/products-http.service';
import {DataResponse} from '../../../../../_core/_services/api/interfaces/data.response';
import {Lesson} from '../../../../../_core/_services/api/models/_interfaces/lesson.interface';
import {BaseModuleInterface} from '../../../../../_core/_services/api/models/_modules/interfaces/base-module.interface';
import {ChainHttpService} from '../../../../../_core/_services/api/http/chain-http.service';
import {DisplayService} from '../../../services/display.service';
import {TrainingCreatorService} from '../../../services/training-creator.service';
import {BaseEditorComponent} from '../../base-editor/base-editor.component';

@Component({
  selector: 'app-content-creator-training-lesson',
  templateUrl: './content-creator-training-lesson.component.html'
})

export class ContentCreatorTrainingLessonComponent extends BaseEditorComponent {


  lesson: Lesson[] = [];
  displayedColumns = ['name', 'slug', 'actions'];

  policy = {
    add: true,
    edit: true,
    delete: true,
    move: true,
    visible: true
  };

  addForm: FormGroup = this.formBuilder.group({...Empty.lesson, parent_id: this.trainingCreator.selected.section.id});
  sub1: Subscription;

  constructor(
    private productsHttp: ProductsHttpService,
    private modulesHttp: ModulesHttpService,
    private trainingCreator: TrainingCreatorService,
    protected formBuilder: FormBuilder,
    protected chainHttp: ChainHttpService,
    protected dialog: MatDialog,
    private moduleHttp: ModulesHttpService,
    private display: DisplayService
  ) {
    super(productsHttp.recursive(trainingCreator.selected.section.id).pipe(map(d => ArrayHelper.sortByOrder(d.data.children))), productsHttp, formBuilder, dialog, chainHttp);
  }

  selectElement(lesson: Lesson) {
    this.trainingCreator.select('lesson', lesson);
    this.sub1 = this.moduleHttp.get<BaseModuleInterface>(lesson.module.id).subscribe((response: DataResponse<BaseModuleInterface>) => {
      this.display.showModuleEditor(response.data);
    });
  }

  add() {
    this.modulesHttp.add(Empty.module).pipe(
      switchMap((module: DataResponse<BaseModuleInterface>) => this.productsHttp.add(Object.assign(this.addForm.value, {module_id: module.data.id}))))
      .subscribe(() => this.reloadData());
  }
}
