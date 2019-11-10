import {NgModule} from '@angular/core';
import {BaseEditorComponent} from './components/base-editor.component';


@NgModule({
  declarations: [
    BaseEditorComponent
  ],
  exports: [
    BaseEditorComponent
  ]
})
export class SharedModule {
}
