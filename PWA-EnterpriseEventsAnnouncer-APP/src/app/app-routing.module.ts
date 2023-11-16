import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginEmailComponent } from './auth/login-email/login-email.component';
import { LoginComponent } from './auth/login/login.component';
import { MainMenuComponent } from './main/main-menu/main-menu.component';
import { RegisterStep1Component } from './auth/register/register-step1/register-step1.component';
import { RegisterStep2Component } from './auth/register/register-step2/register-step2.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterStep3Component } from './auth/register/register-step3/register-step3.component';
import { AnnouncementsComponent } from './main/announcements/announcements.component';
import { InboxComponent } from './main/announcements/inbox/inbox.component';
import { ViewItemComponent } from './main/announcements/inbox/view-item/view-item.component';
import { ManagementComponent } from './main/announcements/management/management.component';
import { NewAnnouncementComponent } from './main/announcements/management/new-annoucement/new-announcement.component';
import { AnnoucementHistoryComponent } from './main/announcements/management/annoucement-history/annoucement-history.component';

const routes: Routes = [
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
    path: 'main-menu',
    component: MainMenuComponent,
    children: [
      { path: 'announcements', component: AnnouncementsComponent },
      
      
    ],
  },
 
  {
    path: 'announcements',
    component: AnnouncementsComponent,
    children: [
    
      
    ],
  },

  { 
    path: 'announcements/Bandeja', 
    component: InboxComponent, 
    children: [
      { path: 'view-item', component: AnnouncementsComponent },
      
      
    ],
  },

  { 
    path: 'announcements/GestorAvisos', 
    component: ManagementComponent, 
    children: [
      
      
    ],
  },
  { 
    path: 'announcements/GestorAvisos/NuevoAviso', 
    component: NewAnnouncementComponent, 
    children: [
      
      
    ],
  },

  { 
    path: 'announcements/GestorAvisos/Historial', 
    component: AnnoucementHistoryComponent, 
    children: [
      
      
    ],
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
