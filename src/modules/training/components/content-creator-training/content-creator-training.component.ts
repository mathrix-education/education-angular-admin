import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {BaseEditorComponent} from '../base-editor/base-editor.component';
import {Product} from '@mathrix-education/education-api-sdk/models/product';
import {ProductsEndpoint} from '@mathrix-education/education-api-sdk';


@Component({
  selector: 'app-content-creator-training',
  templateUrl: './content-creator-training.component.html'
})

export class ContentCreatorTrainingComponent extends BaseEditorComponent<Product> {


  trainings: Product[] = [];
  displayedColumns = ['name', 'slug', 'description', 'price', 'buyable', 'actions'];

  policy = {
    add: true,
    edit: true,
    delete: true,
  };

  addForm: FormGroup = this.formBuilder.group(Object.assign({}, {type: 'training'}));

  constructor(
    private productsHttp: ProductsEndpoint,
    protected formBuilder: FormBuilder,
    protected dialog: MatDialog
  ) {
    super(productsHttp, productsHttp.listByType(['training']), formBuilder, dialog);
  }

  selectElement(training: Product) {
    // this.trainingCreator.select('training', training);
    // this.nextTab.emit();
  }
}
