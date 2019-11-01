import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {AdminGuard} from './guards/admin.guard';
import {LoginGuard} from './guards/login.guard';
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
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {enableTracing: !environment.production && false})],
  exports: [RouterModule]
})
export class BootstrapRoutingModule {
}
