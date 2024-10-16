import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-announcements',
    templateUrl: './announcements.component.html',
    styleUrls: ['./announcements.component.css'],
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    host: {
      class: " flex  flex-col flex-grow  flex-shrink-1   items-center justify-center" ,
    }
})
export class AnnouncementsComponent {

  constructor(private router: Router) { }

  private currentRoute = this.router.url;


}
