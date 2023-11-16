import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MainMenuComponent } from './main/main-menu/main-menu.component';
import { LoginComponent } from './auth/login/login.component';
import { LoginEmailComponent } from './auth/login-email/login-email.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterStep1Component } from './auth/register/register-step1/register-step1.component';
import { RegisterStep2Component } from './auth/register/register-step2/register-step2.component';
import { RegisterStep3Component } from './auth/register/register-step3/register-step3.component';
import { AnnouncementsComponent } from './main/announcements/announcements.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InboxComponent } from './main/announcements/inbox/inbox.component';
import { ManagementComponent } from './main/announcements/management/management.component';
import { ViewItemComponent } from './main/announcements/inbox/view-item/view-item.component';
import { AnnoucementHistoryComponent } from './main/announcements/management/annoucement-history/annoucement-history.component';
import { Step2Component } from './main/announcements/management/new-annoucement/step2/step2.component';
import { Step1Component } from './main/announcements/management/new-annoucement/step1/step1.component';
import { Step3Component } from './main/announcements/management/new-annoucement/step3/step3.component';
import { zip } from 'rxjs';
import { NewAnnouncementComponent } from './main/announcements/management/new-annoucement/new-announcement.component';


@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    LoginComponent,
    LoginEmailComponent,
    RegisterComponent,
    AuthComponent,
    RegisterStep1Component,
    RegisterStep2Component,
    RegisterStep3Component,
    AnnouncementsComponent,
    InboxComponent,
    ManagementComponent,
    ViewItemComponent,
    AnnoucementHistoryComponent,
    NewAnnouncementComponent,
    Step1Component,
    Step2Component,
    Step3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
