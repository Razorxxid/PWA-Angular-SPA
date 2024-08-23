import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LayoutComponent } from './main/layout/layout.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports : [RouterOutlet, LayoutComponent, CommonModule],
  standalone: true
})
export class AppComponent implements OnInit {
  currentUrl: string = '';

  event: Observable<RouterOutlet> | null = null;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.url;
      });
  }

  ngOnInit() {
     this.currentUrl = this.router.url;
  }
  isMainMenuRoute(): boolean {
    return this.currentUrl === '/main-menu';
  }
}