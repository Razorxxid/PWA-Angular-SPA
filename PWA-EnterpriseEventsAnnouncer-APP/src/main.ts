import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './routes.service';
import { jWTInterceptorInterceptor } from './app/jwtinterceptor.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([jWTInterceptorInterceptor])),
    provideRouter(routes),
    provideServiceWorker('/ngsw-worker.js', { enabled: true }),
  ]
}).catch(err => console.error(err));
