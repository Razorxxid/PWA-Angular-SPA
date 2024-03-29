import { Component } from '@angular/core';
import { Router, RouterOutlet,} from '@angular/router';
import { LayoutComponent } from './main/layout/layout.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, LayoutComponent]
})
export class AppComponent {
  title = 'El Gremio en tu Hogar';

  constructor(private router: Router) {
  }


  isMainMenuRoute(): boolean {
    return this.router.url !== '/main-menu';
  }

  ngOnInit() {
    if(window.matchMedia('(display-mode: standalone)').matches) {
      console.log('La app se está ejecutando en modo standalone');
    } else {
      console.log('La app se está ejecutando en un navegador');
    }

  }
}
