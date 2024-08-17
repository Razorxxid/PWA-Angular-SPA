import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet   } from '@angular/router';
import { SignalRService } from 'src/app/services/security/signalr.service';
import { StorageService } from 'src/app/services/security/storage.service';
import { UserDataService } from 'src/app/services/UserDataService';
import { UserData } from 'src/app/viewmodels/userData';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
  imports: [ CommonModule,
    RouterModule],
    standalone: true,
})
export class MainMenuComponent //implements OnInit 
{
 
    userData: UserData = new UserData();
    userName: string = '';

  constructor(
    private router: Router,
    private storageService: StorageService,
    private uDService: UserDataService
  ) { }

  ngOnInit() {
    this.uDService.getUserData().subscribe({
        next: (data: UserData) => {
          this.userData = data;
          this.userName = this.userData.name;
        },
        error: (err) => console.error('Error fetching user data:', err)
      });
      
  }

  cerrarSesion() {
    window.localStorage.removeItem('USER_KEY');
    window.localStorage.removeItem('token');
    window.sessionStorage.removeItem('USER_KEY');
    window.sessionStorage.removeItem('token');
    this.storageService.clean();
    // Optionally navigate to login or home
    this.router.navigate(['/login']);
  }
}
