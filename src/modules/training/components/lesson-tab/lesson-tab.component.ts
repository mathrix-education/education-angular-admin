import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {DataResponse, ModulesEndpoint, ProductsEndpoint} from '@mathrix-education/education-api-sdk';
import {BaseEditorComponent} from '../../../shared/components/base-editor/base-editor.component';
import {Module} from '@mathrix-education/education-api-sdk/models/module';
import {Store} from '@ngxs/store';
import {switchMap} from 'rxjs/operators';
import {Product} from '@mathrix-education/education-api-sdk/models/product';
import {SetSelectedLesson} from '../../../../states/training/training.action';


@Component({
  selector: 'app-training-lesson-tab',
  templateUrl: './lesson-tab.component.html'
})

export class LessonTabComponent extends BaseEditorComponent<Product> implements OnInit {
  displayedColumns = ['name', 'slug', 'actions'];

  policy = {
    add: true,
    edit: true,
    delete: true,
    move: true,
    visible: true
  };

  addForm: FormGroup = this.formBuilder.group({name: '', slug: '', type: 'lesson', visible: false, order: 0});

  constructor(
    private productsEndpoint: ProductsEndpoint,
    private modulesEndpoint: ModulesEndpoint,
    private store: Store,
    protected formBuilder: FormBuilder,
    protected dialog: MatDialog
  ) {
    super(productsEndpoint, null, formBuilder, dialog);
  }

  ngOnInit(): void {
    this.initIndex();
  }


  initIndex() {
    const selectedSection = this.store.selectSnapshot(state => state.training.selectedSection);
    this.index = this.productsEndpoint.list({
      page: this.page,
      per_page: this.perPage,
      filters: [['type', '=', 'lesson'],
        ['parent_id', '=', selectedSection.id],
      ],
      expand: ['module']

    });
    this.reloadData();
  }

  selectElement(lesson: Module) {
    this.store.dispatch(new SetSelectedLesson(lesson));
  }

  add() {
    console.log(this.addForm);
    const selectedSection = this.store.selectSnapshot(state => state.training.selectedSection);
    // @ts-ignore
    this.modulesEndpoint.create({type: 'course', visible: false, order: 0}).pipe(
      switchMap((module: DataResponse<Module>) => this.productsEndpoint.create(Object.assign(this.addForm.value, {
        module_id: module.data.id,
        parent_id: selectedSection.id
      }))))
      .subscribe(() => this.reloadData());
  }
}
