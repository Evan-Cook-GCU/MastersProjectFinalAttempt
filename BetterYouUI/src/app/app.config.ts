import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandlerService } from './services/error-handling/global-error-handler.service';

import { routes } from './app.routes';
import { StorageService } from './services/storage/storage.service';
import { DecimalPipe } from '@angular/common';
import { CustomerService } from './primeng-table-complete/customer.service';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    StorageService,
    DecimalPipe,
    CustomerService,
    provideAnimations(),
    provideHttpClient(),
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    provideRouter(routes)
  ]
};
