import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/security/auth.service';
import { StorageService } from 'src/app/services/security/storage.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-login-email',
    templateUrl: './login-email.component.html',
    styleUrls: ['./login-email.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, RouterLink]
})
export class LoginEmailComponent implements OnInit {
    profileForm = new FormGroup({


        username: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      });


    router : Router;

    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    constructor(private authService: AuthService, private storageService: StorageService, router : Router) { 
        this.router = router;
    }

    ngOnInit(): void {
        if (this.storageService.isLoggedIn()) {
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        }
    }

    onSubmit(): void {
        const { username, password } = this.profileForm.value as { username: string; password: string; }
      
        this.authService.login(username, password).subscribe({
          next: (response: any) => {
            if (response) {
           
              this.isLoginFailed = false;
              this.isLoggedIn = true;

              if (this.isLoggedIn) {
                console.log('Login successful');
                const  userId: string = response.userId;
                const token : string = response.token;

                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                

                this.router.navigate(['/main-menu']);

              }
            }
          },
          error: err => {
            console.error('Error en la respuesta:', err);
        
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
          }
        });
      }
      
    setCookie(name: string, value: string, days: number): void {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${value}; ${expires}; HttpOnly; Secure; SameSite=Strict`;
    }

    reloadPage(): void {
        window.location.reload();
    }


    
}