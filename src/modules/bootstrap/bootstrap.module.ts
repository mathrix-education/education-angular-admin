import {ErrorHandler, NgModule} from '@angular/core';
import {RootComponent} from './components/root/root.component';
import {SentryErrorHandler} from './sentry-error-handler';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {Route, RouterModule} from '@angular/router';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {NgxsModule} from '@ngxs/store';

const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([]),
    NgxsStoragePluginModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: SentryErrorHandler
  }],
  bootstrap: [RootComponent]
})
export class BootstrapModule {
}
