import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';	

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css'],
    standalone: true,
    imports: [RouterLink, RouterOutlet]
})
export class MainMenuComponent {
  constructor(private router: Router) { }

 

}
