import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app/app.routes';
import { LoginComponent } from './app/pages/login/login.component';
import { credentialsInterceptor } from './app/auth/credentials.interceptor';

bootstrapApplication(LoginComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([credentialsInterceptor]) // add the interceptor
    ),
  ],
}).catch(err => console.error(err));
