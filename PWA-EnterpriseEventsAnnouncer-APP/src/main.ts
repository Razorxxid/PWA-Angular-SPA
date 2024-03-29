import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HTTP_INTERCEPTORS, HttpClientModule, withInterceptors } from "@angular/common/http";
import { enableProdMode, importProvidersFrom } from "@angular/core";
import { BrowserModule, bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MainMenuComponent } from './app/main/main-menu/main-menu.component';
import { AnnoucementHistoryComponent } from './app/main/announcements/management/annoucement-history/annoucement-history.component';
import { NewAnnouncementComponent } from './app/main/announcements/management/new-annoucement/new-announcement.component';
import { ManagementComponent } from './app/main/announcements/management/management.component';
import { InboxComponent } from './app/main/announcements/inbox/inbox.component';
import { AnnouncementsComponent } from './app/main/announcements/announcements.component';
import { RegisterStep1Component } from './app/auth/register/register-step1/register-step1.component';
import { RegisterStep2Component } from './app/auth/register/register-step2/register-step2.component';
import { RegisterStep3Component } from './app/auth/register/register-step3/register-step3.component';
import { LoginComponent } from './app/auth/login/login.component';
import { AuthComponent } from './app/auth/auth.component';
import { RegisterComponent } from './app/auth/register/register.component';
import { LoginEmailComponent } from './app/auth/login-email/login-email.component';
import { AuthenticatedGuardService } from './app/services/security/authenticated-guard.service';
import { ViewItemComponent } from './app/main/announcements/inbox/view-item/view-item.component';
import { jWTInterceptorInterceptor } from './app/jwtinterceptor.interceptor';
import { ServiceWorkerModule, provideServiceWorker } from '@angular/service-worker';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, HttpClientModule, AuthenticatedGuardService,),
        // ...
       // provideServiceWorker('/ngsw-worker.js', { enabled: true }),
        provideHttpClient(withInterceptors([jWTInterceptorInterceptor])),
        provideRouter([

          { path:  '' , redirectTo: 'main-menu', pathMatch: 'full'},          

          
      

            { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
            { path: 'register', redirectTo: 'register/step1', pathMatch: 'full' },
            
            {
              path: 'auth',
              component: AuthComponent,
              children: [
                { path: 'login', component: LoginComponent },
                { path: 'register', component: RegisterComponent },
                { path: 'login-email', component: LoginEmailComponent },
                // Agrega más rutas para otros componentes aquí si es necesario
              ],
            },
            {
              path: 'register',
              component: RegisterComponent,
              children: [
                { path: 'step1', component: RegisterStep1Component },
                { path: 'step2', component: RegisterStep2Component },
                { path: 'step3', component: RegisterStep3Component },
                
              ],
            },
           
           
            {
              path: 'announcements',
              canActivate: [AuthenticatedGuardService],
              component: AnnouncementsComponent,
              children: [
                { path: '', component: AnnouncementsComponent, pathMatch: 'full' },
             
              ]
            },

            {
              path: 'announcements/GestorAvisos',
              component: ManagementComponent,
              children: [
                { path: '', component: ManagementComponent, pathMatch: 'full' },
       
              ]

            },
            {
              path: 'announcements/Bandeja',
              component: InboxComponent,
              children: [
                { path: '', component: InboxComponent, pathMatch: 'full' },
              ]
            },



           
            { 
              path: 'announcements/GestorAvisos/NuevoAviso', 
              canActivate: [AuthenticatedGuardService],
              component: NewAnnouncementComponent, 
              children: [
                
                
              ],
            },
          
            { 
              path: 'announcements/GestorAvisos/Historial', 
              canActivate: [AuthenticatedGuardService],
              component: AnnoucementHistoryComponent, 
              children: [
                
                
              ],
            },

            { 
              path: 'main-menu', 
              canActivate: [AuthenticatedGuardService],
              component: MainMenuComponent, 
              children: [ 
                  { path: 'announcements', component: AnnouncementsComponent },
                  
              ],
            },

            { path: '**', redirectTo: 'main-menu', pathMatch: 'full' },
        ]),
    ]



   
    
}
).catch(err => console.error(err));
