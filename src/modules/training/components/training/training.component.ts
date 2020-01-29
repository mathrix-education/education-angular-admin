import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BaseEditorComponent} from '../../../shared/components/base-editor/base-editor.component';
import {Product} from '@mathrix-education/education-api-sdk/models/product';
import {ProductsEndpoint} from '@mathrix-education/education-api-sdk';
import {Store} from '@ngxs/store';
import {SetSelectedTraining} from '../../../../states/training/training.action';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html'
})

export class TrainingComponent extends BaseEditorComponent<Product> {


  trainings: Product[] = [];
  displayedColumns = ['name', 'slug', 'description', 'price', 'buyable', 'actions'];

  policy = {
    add: true,
    edit: true,
    delete: true
  };

  addForm: FormGroup = this.formBuilder.group({
    name: '',
    slug: '',
    description: '',
    price: 0,
    type: 'training',
    buyable: false,
    visible: true,
    order: 0
  });

  constructor(
    private productsHttp: ProductsEndpoint,
    private store: Store,
    protected formBuilder: FormBuilder,
    protected dialog: MatDialog
  ) {
    super(productsHttp, productsHttp.listByType(['training']), formBuilder, dialog);
  }

  selectElement(training: Product) {
    this.store.dispatch(new SetSelectedTraining(training));
  }
}
