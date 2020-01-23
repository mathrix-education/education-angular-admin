import {ErrorHandler, NgModule} from '@angular/core';
import {RootComponent} from './components/root/root.component';
import {SentryErrorHandler} from './sentry-error-handler';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgxsModule} from '@ngxs/store';
import {BootstrapRoutingModule} from './bootstrap-routing.module';
import {AdminState} from '../../states/admin/admin.state';
import {UserState} from '../../states/user/user.state';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {environment} from '../../environments/environment';
import {AuthEndpoint, EducationAPISDKModule} from '@mathrix-education/education-api-sdk';
import {TrainingState} from '../../states/training/training.state';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {HttpClientModule} from '@angular/common/http';
import {InMemoryCache} from 'apollo-cache-inmemory';


@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    BrowserModule,
    BrowserAnimationsModule,
    BootstrapRoutingModule,
    EducationAPISDKModule.withConfig({authTokenName: environment.token, baseUrl: environment.api}),
    NgxsModule.forRoot([AdminState, UserState, TrainingState]),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
    NgxsStoragePluginModule.forRoot({key: ['admin']}),
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: SentryErrorHandler
  },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.api
          })
        };
      },
      deps: [HttpLink]
    }],
  bootstrap: [RootComponent]
})

export class BootstrapModule {
}
