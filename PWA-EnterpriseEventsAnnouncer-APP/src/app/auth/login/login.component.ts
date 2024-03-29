import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [RouterLink]
})
export class LoginComponent 
{
  constructor(private router: Router) { }


  isRegisterRoute(): boolean {
    return this.router.url === '/register';
  }
}
