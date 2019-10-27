import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {map} from 'rxjs/operators';
import {ModulesEndpoint, ProductsEndpoint} from '@mathrix-education/education-api-sdk';
import {BaseEditorComponent} from '../base-editor/base-editor.component';
import {Module} from '@mathrix-education/education-api-sdk/models/module';
import {Product} from '@mathrix-education/education-api-sdk/models/product';


@Component({
  selector: 'app-content-creator-training-lesson',
  templateUrl: './content-creator-training-lesson.component.html'
})

export class ContentCreatorTrainingLessonComponent extends BaseEditorComponent<Module> {


  lesson: Product[] = [];
  displayedColumns = ['name', 'slug', 'actions'];

  policy = {
    add: true,
    edit: true,
    delete: true,
    move: true,
    visible: true
  };

  addForm: FormGroup;
  // addForm: FormGroup = this.formBuilder.group({...Empty.lesson, parent_id: this.trainingCreator.selected.section.id});
  sub1: Subscription;

  constructor(
    private productsHttp: ProductsEndpoint,
    private modulesEndpoint: ModulesEndpoint,
    private modulesHttp: ModulesEndpoint,
    protected formBuilder: FormBuilder,
    protected dialog: MatDialog
  ) {
    super(modulesEndpoint, productsHttp.recursive(3), formBuilder, dialog);
  }

  selectElement(lesson: Module) {
    // this.trainingCreator.select('lesson', lesson);
    // this.sub1 = this.moduleHttp.read(lesson.module.id).subscribe((response: DataResponse<BaseModuleInterface>) => {
    //   this.display.showModuleEditor(response.data);
    // });
  }

  add() {
    // this.modulesHttp.add(Empty.module).pipe(
    //   switchMap((module: DataResponse<BaseModuleInterface>) => this.productsHttp.add(Object.assign(this.addForm.value, {module_id: module.data.id}))))
    //   .subscribe(() => this.reloadData());
  }
}
