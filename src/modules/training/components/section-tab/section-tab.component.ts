import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ProductsEndpoint} from '@mathrix-education/education-api-sdk';
import {Module} from '@mathrix-education/education-api-sdk/models/module';
import {BaseEditorComponent} from '../../../shared/components/base-editor.component';
import {Store} from '@ngxs/store';
import {SetSelectedSection} from '../../../../states/training/training.action';

@Component({
  selector: 'app-section-tab',
  templateUrl: './section-tab.component.html'
})

export class SectionTabComponent extends BaseEditorComponent<any> implements OnInit {


  modules: Module[] = [];
  displayedColumns = ['name', 'slug', 'actions'];

  policy = {
    add: true,
    edit: true,
    delete: true,
    move: true,
    visible: true
  };

   addForm: FormGroup ;

  constructor(
    private productsEndpoint: ProductsEndpoint,
    private store: Store,
    protected formBuilder: FormBuilder,
    protected dialog: MatDialog
  ) {
    super(productsEndpoint, productsEndpoint.listByType(['section']), formBuilder, dialog);
  }


  ngOnInit(): void {
    this.initIndexAndAddForm();

  }

  initIndexAndAddForm() {
    const selectedTraining = this.store.selectSnapshot(state => state.training.selectedTraining);
    this.index = this.productsEndpoint.list({
      page: this.page,
      per_page: this.perPage,
      filters: [['type', '=', 'section'],
        ['parent_id', '=', selectedTraining.id]
      ]
    });
    this.addForm = this.formBuilder.group({name: '', slug: '', type: 'section', image: null, description: '', price: 0, visible: false, order: 0, parent_id: selectedTraining.id});
    this.reloadData();
  }

  selectElement(section: any) {
    this.store.dispatch(new SetSelectedSection(section));
  }
}

