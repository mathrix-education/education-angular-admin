import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LatestCommentsPageComponent} from './pages/latest-comments-page/latest-comments-page.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {RestEditorModule} from '@mathrix-education/rest-editor';
import {Route, RouterModule} from '@angular/router';

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
