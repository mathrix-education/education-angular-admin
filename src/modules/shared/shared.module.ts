import {NgModule} from '@angular/core';
import {BaseEditorComponent} from './components/base-editor/base-editor.component';
import {SilicateRendererComponent} from './components/silicate-renderer/silicate-renderer.component';
import {SilicateToolbarComponent} from './components/silicate-toolbar/silicate-toolbar.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm.dialog';
import {SmileySelectorComponent} from './components/smiley-selector/smiley-selector.component';
import {SilicateCoreModule} from '@mathrix-education/silicate-core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SilicateEducationModule} from '@mathrix-education/silicate-education';
import {SilicateEssentialsModule} from '@mathrix-education/silicate-essentials';
import {SilicateLatexModule} from '@mathrix-education/silicate-latex';
import {SilicateVideosModule} from '@mathrix-education/silicate-videos';


@NgModule({
  declarations: [
    BaseEditorComponent, SilicateRendererComponent, SilicateToolbarComponent, ConfirmDialogComponent, SmileySelectorComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  imports: [
    SilicateEssentialsModule,
    SilicateVideosModule,
    SilicateLatexModule,
    SilicateEducationModule,
    SilicateCoreModule.withProviders([
      ...SilicateVideosModule.providers(),
      ...SilicateLatexModule.providers(),
      ...SilicateEducationModule.providers()]),
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    BaseEditorComponent,
    SilicateRendererComponent
  ]
})
export class SharedModule {
}
