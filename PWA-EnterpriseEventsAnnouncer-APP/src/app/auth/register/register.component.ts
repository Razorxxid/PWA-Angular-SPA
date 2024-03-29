import { Component } from '@angular/core';
import { RegistrationData } from './registration-data';
import { Router } from '@angular/router';
import { RegisterStep3Component } from './register-step3/register-step3.component';
import { RegisterStep2Component } from './register-step2/register-step2.component';
import { RegisterStep1Component } from './register-step1/register-step1.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: true,
    imports: [NgIf, RegisterStep1Component, RegisterStep2Component, RegisterStep3Component]
})
export class RegisterComponent {
  registrationData: RegistrationData = new RegistrationData();

  constructor(private router: Router) { }

  isStep1() : boolean {
    return this.router.url === '/register/step1';
  }

  isStep2() : boolean {
    return this.router.url === '/register/step2';
  }

  isStep3() : boolean {
    return this.router.url === '/register/step3';
  }
  // Función para combinar los datos de los pasos
  combineData(dataFromStep1: RegistrationData, dataFromStep2: RegistrationData) {
    this.registrationData = { ...dataFromStep1, ...dataFromStep2 };
  }
}