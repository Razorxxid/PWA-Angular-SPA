import { Routes } from '@angular/router';
import { AuthComponent } from './app/auth/auth.component';
import { LoginComponent } from './app/auth/login/login.component';
import { RegisterStep1Component } from './app/auth/register/register-step1/register-step1.component';
import { RegisterComponent } from './app/auth/register/register.component';
import { LoginEmailComponent } from './app/auth/login-email/login-email.component';
import { AnnouncementsComponent } from './app/main/announcements/announcements.component';
import { ManagementComponent } from './app/main/announcements/management/management.component';
import { InboxComponent } from './app/main/announcements/inbox/inbox.component';
import { NewAnnouncementComponent } from './app/main/announcements/management/new-annoucement/new-announcement.component';
import { AnnoucementHistoryComponent } from './app/main/announcements/management/annoucement-history/annoucement-history.component';
import { MainMenuComponent } from './app/main/main-menu/main-menu.component';
import { RegisterStep2Component } from './app/auth/register/register-step2/register-step2.component';
import { RegisterStep3Component } from './app/auth/register/register-step3/register-step3.component';
import { authenticatedGuard } from './app/services/security/authenticated-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: 'main-menu', pathMatch: 'full' },
  { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'register', redirectTo: 'register/step1', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login-email', component: LoginEmailComponent },
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
    canActivate: [authenticatedGuard],
    component: AnnouncementsComponent,
    children: [
      { path: '', component: AnnouncementsComponent, pathMatch: 'full' },
    ],
  },
  {
    path: 'announcements/GestorAvisos',
    component: ManagementComponent,
    children: [
      { path: '', component: ManagementComponent, pathMatch: 'full' },
    ],
  },
  {
    path: 'announcements/Bandeja',
    component: InboxComponent,
    children: [
      { path: '', component: InboxComponent, pathMatch: 'full' },
    ],
  },
  { 
    path: 'announcements/GestorAvisos/NuevoAviso', 
    canActivate: [authenticatedGuard],
    component: NewAnnouncementComponent,
  },
  { 
    path: 'announcements/GestorAvisos/Historial', 
    canActivate: [authenticatedGuard],
    component: AnnoucementHistoryComponent,
  },
  { 
    path: 'main-menu', 
    canActivate: [authenticatedGuard],
    component: MainMenuComponent,
    children: [ 
      { path: 'announcements', component: AnnouncementsComponent },
    ],
  },
  { path: '**', redirectTo: 'main-menu', pathMatch: 'full' },
];
