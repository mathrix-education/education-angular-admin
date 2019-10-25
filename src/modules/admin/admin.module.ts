import {NgModule} from '@angular/core';
import {AdminComponent} from './components/admin/admin.component';
import {BootstrapModule} from '../bootstrap/bootstrap.module';
import {CommonModule} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {Route, RouterModule} from '@angular/router';
import {SidenavComponent} from './components/sidenav/sidenav.component';

const routes: Route[] = [
  {
    path: '', component: AdminComponent,

    children: [
      {path: 'users', loadChildren: () => import('../user/user.module').then(m => m.UserModule)},
      {path: '', redirectTo: 'users'}
    ]
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    SidenavComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule.forChild(routes)
  ],
})
export class AdminModule {
}
