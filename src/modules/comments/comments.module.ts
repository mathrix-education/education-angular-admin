import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LatestCommentsPageComponent} from './pages/latest-comments-page/latest-comments-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {RestEditorModule} from '@mathrix-education/rest-editor';
import {Route, RouterModule} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

const routes: Route[] = [
  {
    path: '',
    component: LatestCommentsPageComponent
  }
];

@NgModule({
  declarations: [LatestCommentsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    FlexModule,
    MatInputModule,
    RestEditorModule
  ]
})
export class CommentsModule {
}
