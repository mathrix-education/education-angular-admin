import {ErrorHandler, NgModule} from '@angular/core';
import {RootComponent} from './components/root/root.component';
import {SentryErrorHandler} from './sentry-error-handler';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {NgxsModule} from '@ngxs/store';
import {BootstrapRoutingModule} from './bootstrap-routing.module';
import {AdminState} from '../../states/admin/admin.state';
import {UserState} from '../../states/user/user.state';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {environment} from '../../environments/environment';
import {AuthEndpoint, EducationAPISDKModule} from '@mathrix-education/education-api-sdk';


@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BootstrapRoutingModule,
    EducationAPISDKModule.withConfig({authTokenName: environment.token, baseUrl: environment.api}),
    NgxsModule.forRoot([AdminState, UserState]),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
    NgxsStoragePluginModule.forRoot(),

  ],
  providers: [{
    provide: ErrorHandler,
    useClass: SentryErrorHandler
  },
    AuthEndpoint],
  bootstrap: [RootComponent]
})
export class BootstrapModule {
}
