import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BaseEditorComponent} from '../../../shared/components/base-editor/base-editor.component';
import {Empty} from '../../../shared/helpers/empty.helper';
import {PolicyEditor} from '@mathrix-education/rest-editor/interfaces/policy-editor.interface';
import {Chapter} from '@mathrix-education/education-api-sdk/models/chapter';
import {ChaptersEndpoint} from '@mathrix-education/education-api-sdk';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-content-creator-chapter',
  templateUrl: './chapter.component.html'
})
export class ChapterComponent extends BaseEditorComponent<Chapter> {
  addForm = this.formBuilder.group(Empty.getChapter());
  displayedColumns = ['name', 'slug', 'actions'];

  policy: PolicyEditor = {
    add: true,
    edit: true,
    delete: true,
    move: true,
    visible: true
  };

  constructor(
    protected chaptersEndpoint: ChaptersEndpoint,
    protected dialog: MatDialog,
    protected formBuilder: FormBuilder,
  ) {
    super(chaptersEndpoint, chaptersEndpoint.list(), formBuilder, dialog);
  }

  selectElement(chapter) {
    //this.contentCreator.select('chapter', chapter);
    //this.nextTab.emit();
  }


  add() {
    const chapter = this.addForm.value;
    //chapter.grade_id = this.contentCreator.selected.grade.id;
    //chapter.discipline_id = this.contentCreator.selected.discipline.id;
    super.add(chapter);
  }


}
