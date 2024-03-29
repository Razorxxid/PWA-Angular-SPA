import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-announcements',
    templateUrl: './announcements.component.html',
    styleUrls: ['./announcements.component.css'],
    standalone: true,
    imports: [RouterOutlet, RouterLink]
})
export class AnnouncementsComponent {

  constructor(private router: Router) { }

  private currentRoute = this.router.url;


}
