import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [{
  path: '',
  component: LoginComponent
},
  {
    path: '**',
    redirectTo: ''
  }
];


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  exports: [LoginComponent]
})

export class LoginModule {
}
