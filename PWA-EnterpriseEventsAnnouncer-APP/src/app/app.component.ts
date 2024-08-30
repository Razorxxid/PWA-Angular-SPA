import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { LayoutComponent } from './main/layout/layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, LayoutComponent, CommonModule],
  standalone: true,
})
export class AppComponent implements OnInit {
  currentUrl$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl$.next(event.urlAfterRedirects);
    });
  }

  isMainMenuRoute(): boolean {
    return this.currentUrl$.value === '/main-menu';
  }

  isAuthRoute(): boolean {
    return this.currentUrl$.value === '/auth/login' ;
  }

}
