import {moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {PolicyEditor} from '@mathrix-education/rest-editor/interfaces/policy-editor.interface';
import {Endpoint} from '@mathrix-education/education-api-sdk/lib/endpoints/endpoint';
import {Model, ModelId} from '@mathrix-education/education-api-sdk/lib/models/model';

/**
 * The BaseEditorComponent provides the base logic for all related editing component in panel admin
 * */
@Component({
  selector: 'app-base-editor',
  template: ''
})
export class BaseEditorComponent<T extends Model<ModelId>> {
  /**addDialogTemplate,editDialogTemplate, deleteDialogTemplate:the dialog template used to add, edit or delete an entity.
   * These templates are given next to the restEditor component*/
  @ViewChild('addDialogTemplate', {static: false}) addDialogTemplate;
  @ViewChild('editDialogTemplate', {static: false}) editDialogTemplate;
  @ViewChild('deleteDialogTemplate', {static: false}) deleteDialogTemplate;

  /** prevTab, nextTab: the event emitter to change tab when the user select an entity */
  @Output() prevTab = new EventEmitter();
  @Output() nextTab = new EventEmitter();

  /** reloadDataSubject: subject to trigger data reload */
  reloadDataSubject = new BehaviorSubject(true);
  /** dataSource:data inside table */
  dataSource: Observable<any>;

  /** addForm, editForm: the form given to add or edit (used by edit and add template) */
  addForm: FormGroup;
  editForm: FormGroup;
  changeActivityForm: FormGroup;
  /** policy: the policy about adding, editing or deleting */
  policy: PolicyEditor;

  /** dialogConfig: material dialog properties */
  readonly dialogConfig = {
    minWidth: 500
  };

  constructor(
    protected endpoint: Endpoint<T>,
    protected index: Observable<any>,
    protected formBuilder: FormBuilder,
    protected dialog: MatDialog
  ) {
    this.dataSource = this.reloadDataSubject.pipe(switchMap(() => this.index));
  }

  /**
   * Start the add process: open the add template
   */
  startAdd() {
    this.dialog.open(this.addDialogTemplate, this.dialogConfig);
  }

  /**
   * Start the edit process:
   * @param model: the model to edit
   * @param fields: the fields to keep on the model (some field are not required in patching so we remove them).
   * (no field given => all field of model are sent)
   */
  startEdit(model: any, fields?: string[]) {

    if (fields) {
      Object.keys(model).forEach(k => {
        if (!fields.includes(k)) {
          delete model[k];
        }
      });
    }
    this.editForm = this.formBuilder.group(model);
    this.dialog.open(this.editDialogTemplate, this.dialogConfig);
  }

  /**
   * Add a model by calling the api
   * @param model: the model to add
   */
  add(model: Model = this.addForm.value) {
    this.endpoint.create(model).subscribe(() => this.reloadData());
  }

  /**
   * Edit a model by calling the api
   * @param model: the model to edit
   */
  edit(model: Model = this.editForm.value) {
    this.endpoint.update(model.id, model).subscribe(() => this.reloadData());
  }

  /**
   * Delete a model by calling the api
   * @param model: the model to edit
   */
  delete(model: Model) {
    this.endpoint.delete(model.id).subscribe(() => this.reloadData());
  }

  /**
   * Change the visibility of the model.
   * @param model The model to change the visibility.
   */
  visible(model) {
    const patchedModel = {...model, ...{visible: !model.visible}};
    // this.endpoint.edit(patchedModel).subscribe(() => this.reloadData());
  }

  /**
   * Reload the data.
   */
  protected reloadData() {
    this.reloadDataSubject.next(true);
  }

  /**
   * Reorder the data
   * @param data The data to reorder.
   * @param previousIndex The previous index given.
   * @param currentIndex The new index.
   */
  protected reorder(data, previousIndex: number, currentIndex: number) {
    const newIdOrdered = data.sort((a, b) => a.order - b.order).map(chapter => chapter.id);
    moveItemInArray(newIdOrdered, previousIndex, currentIndex);
    return newIdOrdered.map((id: number, index: number) => {
      const newData = data.find(item => item.id === id);
      newData.order = index;
      return newData;
    });
  }

  /**
   * Move an the items given from previousIndex to currentIndex.
   * @param event the mouse event.
   */
  move(event: { previousIndex: number, currentIndex: number }) {
    // this.index.pipe(
    //   switchMap((items: any[]) => {
    //     // adjust order
    //     const orderedItems = this.reorder(items, event.previousIndex, event.currentIndex);

    //   return this.chainHttp.sendRaw(
    //     orderedItems.map((orderedItem, index) => {
    //       return {
    //         name: 'item' + index,
    //         method: 'patch',
    //         url: `${this.endpoint.base}/${orderedItem.id}`,
    //         data: orderedItem
    //       };
    //     }));
    // })).subscribe(() => this.reloadData());
  }
}
