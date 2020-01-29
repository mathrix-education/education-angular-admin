import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingPageComponent} from './pages/training-page/training-page.component';
import {LessonTabComponent} from './components/lesson-tab/lesson-tab.component';
import {SectionTabComponent} from './components/section-tab/section-tab.component';
import {PackComponent} from './components/pack/pack.component';
import {PremiumUpsellComponent} from './components/premium-upsell/premium-upsell.component';
import {TrainingComponent} from './components/training/training.component';
import {RestEditorModule} from '@mathrix-education/rest-editor';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {PricePipe} from './pipes/price.pipe';
import {Route, RouterModule} from '@angular/router';
import { TrainingTabComponent } from './components/training-tab/training-tab.component';
import {SharedModule} from '../shared/shared.module';
import {SilicateCoreModule} from '@mathrix-education/silicate-core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';


const routes: Route[] = [
  {
    path: '',
    component: TrainingPageComponent
  }
];

@NgModule({
  declarations: [
    LessonTabComponent,
    SectionTabComponent,
    PackComponent,
    PremiumUpsellComponent,
    TrainingComponent,
    TrainingPageComponent,
    PricePipe,
    TrainingTabComponent],
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
    MatListModule,
    RouterModule.forChild(routes),
    SharedModule,
    SilicateCoreModule
  ]
})
export class TrainingModule {
}
