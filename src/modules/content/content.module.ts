import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route} from '@angular/router';
import {ActivityComponent} from './components/activity/activity.component';
import {ChapterComponent} from './components/chapter/chapter.component';
import {CountryComponent} from './components/country/country.component';
import {ContentCreatorDisciplineComponent} from './components/content-creator-discipline/content-creator-discipline.component';
import {ContentCreatorGradeComponent} from './components/content-creator-grade/content-creator-grade.component';
import {ContentCreatorModuleComponent} from './components/content-creator-module/content-creator-module.component';
import {NotionComponent} from './components/content-creator-notion/content-creator-notion.component';
import {MatTableModule} from '@angular/material/table';
import {RestEditorModule} from '@mathrix-education/rest-editor';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';


// const routes: Route[] = [{
//   path: '',
//   component:
// }];

@NgModule({
  declarations: [
    ActivityComponent,
    ChapterComponent,
    CountryComponent,
    ContentCreatorDisciplineComponent,
  ContentCreatorGradeComponent,
  ContentCreatorModuleComponent,
  NotionComponent],
  imports: [
    CommonModule,
    MatTableModule,
    RestEditorModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    FlexModule,
    MatIconModule,
    MatListModule
  ]
})
export class ContentModule {
}
