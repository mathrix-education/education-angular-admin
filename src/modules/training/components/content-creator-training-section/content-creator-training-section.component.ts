import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ProductsEndpoint} from '@mathrix-education/education-api-sdk';
import {Module} from '@mathrix-education/education-api-sdk/models/module';
import {BaseEditorComponent} from '../base-editor/base-editor.component';

@Component({
  selector: 'app-content-creator-training-section',
  templateUrl: './content-creator-training-section.component.html'
})

export class ContentCreatorTrainingSectionComponent extends BaseEditorComponent<any> {

  @Output() nextTab = new EventEmitter();

  modules: Module[] = [];
  displayedColumns = ['name', 'slug', 'actions'];

  policy = {
    add: true,
    edit: true,
    delete: true,
    move: true,
    visible: true
  };

  // addForm: FormGroup = this.formBuilder.group({...Empty.lesson, parent_id: this.trainingCreator.selected.training.id});

  constructor(
    private productsHttp: ProductsEndpoint,
    protected formBuilder: FormBuilder,
    protected dialog: MatDialog
  ) {
    super(productsHttp, productsHttp.listByType(['any']), formBuilder, dialog );
  }

  selectElement(section: any) {
      //this.trainingCreator.select('section', section);
      this.nextTab.emit();
  }

  // add() {
  //   const training = this.addForm.value;
  //   super.add(training);
  // }

}

