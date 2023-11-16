import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent {

  constructor(private router: Router) { }


  navigateToBandeja() {
    this.router.navigate(['/announcements/Bandeja']);
  }

  navigateToManager() {
    this.router.navigate(['/announcements/GestorAvisos']);
  }
}
