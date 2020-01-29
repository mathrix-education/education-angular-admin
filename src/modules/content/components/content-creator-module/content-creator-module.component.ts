import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';
import {BaseEditorComponent} from '../../../shared/components/base-editor/base-editor.component';
import {Empty} from '../../../shared/helpers/empty.helper';
import {PolicyEditor} from '@mathrix-education/rest-editor/interfaces/policy-editor.interface';
import {ModulesEndpoint} from '@mathrix-education/education-api-sdk';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Module} from '@mathrix-education/education-api-sdk/models/module';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-content-creator-module',
  templateUrl: './content-creator-module.component.html'
})
export class ContentCreatorModuleComponent extends BaseEditorComponent<Module> {

  @ViewChild('changeActivityTemplate', {static: false}) changeActivityTemplate;

  addForm = this.formBuilder.group(Object.assign(Empty.module, {
      content: `{"text":"", "silicate": [], "prefer":"silicate", "reason":""}`,
      // activity_id: this.contentCreator.selected.activity.id
    },
    {type: 'course'}));

  changeActivityForm = new FormGroup({
    activity_id: new FormControl()
  });

  displayedColumns = ['seo_title', 'seo_slug', 'seo_description', 'seo_index', 'type', 'modules', 'actions'];

  policy: PolicyEditor = {
    add: true,
    edit: true,
    delete: true,
    move: true,
    visible: true,
  };

  /** activité parente */
  activity;

  constructor(
    protected modulesEndpoint: ModulesEndpoint,
    private store: Store,
    private snackbar: MatSnackBar,
    protected dialog: MatDialog,
    protected formBuilder: FormBuilder
  ) {
    super(modulesEndpoint, modulesEndpoint.list(), formBuilder, dialog); // list by activity
  }

  selectElement(module: Module) {
    if (!this.store.selectSnapshot(state => state.session.user).scopes.includes('modules:delete')
      && module.options && module.options.locked) {
      this.snackbar.open('Ce cours est sécurisé, vous n\'avez pas les accès pour le modifier.', null, {duration: 2500});
    }

    // this.contentCreator.select('module', module);
    // if (module.type === 'course' && JSON.parse(module.content).prefer === 'text') {
    //    this.notification.send('L\'édition de ce cours n\'est pas disponible.');
    //  } else {
    //    this.display.showModuleEditor(module).afterClosed().subscribe(t => {
    //      this.reloadData();
    //    });
    //  }
  }

  openMessenger(event: any, module: Module) {
    event.stopPropagation();
    // this.dialog.open(ModuleTagEditorComponent, {data: module})
    //   .afterClosed().pipe(switchMap(() => this.modulesEndpoint.edit(module))
    // ).subscribe(() => {
    //   this.snackbar.open('Module édité.', null, {duration: 2500});
    // });
  }

  showActivityByID(form) {
    if (!form.value.activity_id) {
      form.value.activity_id = this.activity.activity_id;
    }
    // this.activitiesHttp.get(form.value.activity_id).subscribe(activity => this.activity = activity);
  }

  startChangeActivity(model) {
    const config = {
      minWidth: 500,
      data: {
        module: model
      }
    };
    this.activity = model;
    this.changeActivityForm.value.activity_id = model.activity_id;
    this.dialog.open(this.changeActivityTemplate, config);
  }

  changeActivity(model: any = this.changeActivityForm.value, module: any) {
    if (!model) {
      return;
    }

    module.activity_id = model.activity_id;
    this.modulesEndpoint.update(module.id, module).subscribe(() => {
      this.reloadData();
      this.snackbar.open(`Le module ${module.seo_title} a bien été transféré dans l'activité ${module.activity_id}.`,
        null, {duration: 2500});
    });

  }
}
