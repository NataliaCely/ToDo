import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './core/interceptor/http/http.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideToastr({timeOut:900, preventDuplicates:true}), provideRouter(routes), provideHttpClient(withInterceptors([httpInterceptor]), withFetch()),]
};
