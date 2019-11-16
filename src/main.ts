import 'hammerjs';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {environment} from './environments/environment';
import {BootstrapModule} from './modules/bootstrap/bootstrap.module';

if (environment.production) {
  // enableProdMode();
}

platformBrowserDynamic().bootstrapModule(BootstrapModule)
  .catch(err => console.error(err));
