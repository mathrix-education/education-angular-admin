import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {BaseEditorComponent} from '../../../shared/components/base-editor/base-editor.component';
import {PolicyEditor} from '@mathrix-education/rest-editor/interfaces/policy-editor.interface';
import {Activity} from '@mathrix-education/education-api-sdk/models/activity';
import {ActivitiesEndpoint} from '@mathrix-education/education-api-sdk';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html'
})
export class ActivityComponent extends BaseEditorComponent<Activity> {

  policy: PolicyEditor = {
    add: true,
    edit: true,
    delete: true,
    move: true,
    visible: true
  };

  addForm = null; // this.formBuilder.group(Object.assign(Empty.getActivity(), {notion_id: this.contentCreator.selected.notion.id}));
  displayedColumns = ['id', 'name', 'type', 'actions'];

  constructor(
    protected activitiesEndpoint: ActivitiesEndpoint,
    protected dialog: MatDialog,
    protected formBuilder: FormBuilder
  ) {
    super(activitiesEndpoint, activitiesEndpoint.list(), formBuilder, dialog);
  }

  selectElement(activity: Activity) {
    // this.contentCreator.select('activity', activity);
    this.nextTab.emit();
  }


}
