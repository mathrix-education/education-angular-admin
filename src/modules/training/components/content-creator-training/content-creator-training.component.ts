import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Empty} from '../../../../../../helpers/empty.helper';
import {ProductsHttpService} from '../../../../../_core/_services/api/http/products-http.service';
import {Training} from '../../../../../_core/_services/api/models/_interfaces/training.interface';
import {ChainHttpService} from '../../../../../_core/_services/api/http/chain-http.service';
import {TrainingCreatorService} from '../../../services/training-creator.service';
import {BaseEditorComponent} from '../../base-editor/base-editor.component';

@Component({
  selector: 'app-content-creator-training',
  templateUrl: './content-creator-training.component.html'
})

export class ContentCreatorTrainingComponent extends BaseEditorComponent {


  trainings: Training[] = [];
  displayedColumns = ['name', 'slug', 'description', 'price', 'buyable', 'actions'];

  policy = {
    add: true,
    edit: true,
    delete: true,
  };

  addForm: FormGroup = this.formBuilder.group(Object.assign({...Empty.training}, {type: 'training'}));

  constructor(
    private productsHttp: ProductsHttpService,
    private trainingCreator: TrainingCreatorService,
    protected formBuilder: FormBuilder,
    protected chainHttp: ChainHttpService,
    protected dialog: MatDialog
  ) {
    super(productsHttp.byTypes(['training']), productsHttp, formBuilder, dialog, chainHttp);
  }

  selectElement(training: Training) {
    this.trainingCreator.select('training', training);
    this.nextTab.emit();
  }
}
