import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {map} from 'rxjs/operators';
import {ArrayHelper} from '../../../../../../helpers/array.helper';
import {Empty} from '../../../../../../helpers/empty.helper';
import {ProductsHttpService} from '../../../../../_core/_services/api/http/products-http.service';
import {Lesson} from '../../../../../_core/_services/api/models/_interfaces/lesson.interface';
import {ChainHttpService} from '../../../../../_core/_services/api/http/chain-http.service';
import {Section} from '../../../../../_core/_services/api/models/_interfaces/section.interface';
import {TrainingCreatorService} from '../../../services/training-creator.service';
import {BaseEditorComponent} from '../../base-editor/base-editor.component';

@Component({
  selector: 'app-content-creator-training-section',
  templateUrl: './content-creator-training-section.component.html'
})

export class ContentCreatorTrainingSectionComponent extends BaseEditorComponent {


  lesson: Lesson[] = [];
  displayedColumns = ['name', 'slug', 'actions'];

  policy = {
    add: true,
    edit: true,
    delete: true,
    move: true,
    visible: true
  };

  addForm: FormGroup = this.formBuilder.group({...Empty.lesson, parent_id: this.trainingCreator.selected.training.id});

  constructor(
    private productsHttp: ProductsHttpService,
    private trainingCreator: TrainingCreatorService,
    protected formBuilder: FormBuilder,
    protected chainHttp: ChainHttpService,
    protected dialog: MatDialog
  ) {
    super(productsHttp.recursive(trainingCreator.selected.training.id).pipe(map(d => ArrayHelper.sortByOrder(d.data.children))),
      productsHttp, formBuilder, dialog, chainHttp);
  }

  selectElement(section: Section) {
      this.trainingCreator.select('section', section);
      this.nextTab.emit();
  }

  add() {
    const training = this.addForm.value;
    super.add(training);
  }

}

