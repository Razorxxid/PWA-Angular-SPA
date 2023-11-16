import { Component } from '@angular/core';
import { RegistrationData } from './registration-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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