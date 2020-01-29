import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {ReportPageComponent} from './pages/report-page/report-page.component';
import {MatCardModule} from '@angular/material/card';
import {RestEditorModule} from '@mathrix-education/rest-editor';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';


const routes: Route[] = [
  {
    path: '',
    component: ReportPageComponent
  }
];

@NgModule({
  declarations: [ReportPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatCardModule,
    RestEditorModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class ReportsModule {
}
