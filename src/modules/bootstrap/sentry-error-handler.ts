import {environment} from '../../environments/environment';
import {ErrorHandler, Injectable} from '@angular/core';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: environment.sentry,
  release: environment.release,
  environment: environment.env
});

@Injectable({
  providedIn: 'root'
})
export class SentryErrorHandler implements ErrorHandler {

  constructor() {
  }

  handleError(error: any): void {
    console.error(error);
  }
}
