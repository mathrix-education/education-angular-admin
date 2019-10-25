import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {AdminGuard} from './guards/admin.guard';
import {LoginGuard} from './guards/login.guard';
import {LoginComponent} from '../login/components/login/login.component';
import {environment} from '../../environments/environment';

const routes: Route[] = [
  {
    path: '',
    canActivate: [AdminGuard],
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () => import('../login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'ss',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {enableTracing: !environment.production})],
  exports: [RouterModule]
})
export class BootstrapRoutingModule {
}
