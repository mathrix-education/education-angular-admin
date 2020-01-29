import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BaseEditorComponent} from '../../../shared/components/base-editor/base-editor.component';
import {Notion} from '@mathrix-education/education-api-sdk/models/notion';
import {Empty} from '../../../shared/helpers/empty.helper';
import {PolicyEditor} from '@mathrix-education/rest-editor/interfaces/policy-editor.interface';
import {NotionsEndpoint} from '@mathrix-education/education-api-sdk';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-content-creator-notion',
  templateUrl: './content-creator-notion.component.html'
})
export class NotionComponent extends BaseEditorComponent<Notion> {

  addForm = this.formBuilder.group(Object.assign(Empty.getNotion(),
    // {chapter_id: this.contentCreator.selected.chapter.id}
  ));
  displayedColumns = ['name', 'actions'];

  policy: PolicyEditor = {
    add: true,
    edit: true,
    delete: true,
    move: true,
    visible: true
  };

  constructor(
    protected notionsEndpoints: NotionsEndpoint,
    protected dialog: MatDialog,
    protected formBuilder: FormBuilder
  ) {
    super(notionsEndpoints, notionsEndpoints.list(), formBuilder, dialog);
  }

  selectElement(notion: Notion) {
    // this.contentCreator.select('notion', notion);
    this.nextTab.emit();
  }
}
