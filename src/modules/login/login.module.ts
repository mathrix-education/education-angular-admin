import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];


@NgModule({
  declarations: [LoginComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatCardModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatInputModule,
        FlexModule,
        ExtendedModule
    ],
  exports: [LoginComponent]
})

export class LoginModule {
}
