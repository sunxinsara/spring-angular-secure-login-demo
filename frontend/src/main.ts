import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withCredentials } from '@angular/common/http'; // 👈 add this
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component'; // or LoginComponent if you bootstrapped that

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withCredentials()), // 👈 this registers HttpClient (and sends cookies to Spring)
  ],
}).catch(err => console.error(err));
