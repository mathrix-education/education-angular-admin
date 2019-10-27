import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingEditorPageComponent} from './pages/training-editor-page/training-editor-page.component';
import {ContentCreatorTrainingLessonComponent} from './components/content-creator-training-lesson/content-creator-training-lesson.component';
import {ContentCreatorTrainingSectionComponent} from './components/content-creator-training-section/content-creator-training-section.component';
import {ContentCreatorPackComponent} from './components/content-creator-pack/content-creator-pack.component';
import {ContentCreatorPremiumUpsellComponent} from './components/content-creator-premium-upsell/content-creator-premium-upsell.component';
import {ContentCreatorTrainingComponent} from './components/content-creator-training/content-creator-training.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatSlideToggleModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {RestEditorModule} from '@mathrix-education/rest-editor';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {BaseEditorComponent} from './components/base-editor/base-editor.component';
import {PricePipe} from './pipes/price.pipe';


@NgModule({
  declarations: [
    BaseEditorComponent,
    ContentCreatorTrainingLessonComponent,
    ContentCreatorTrainingSectionComponent,
    ContentCreatorPackComponent,
    ContentCreatorPremiumUpsellComponent,
    ContentCreatorTrainingComponent,
    TrainingEditorPageComponent,
    PricePipe],
  imports: [
    CommonModule,
    MatTabsModule,
    RestEditorModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    MatListModule
  ]
})
export class TrainingModule {
}
