import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

enum creationStep {
  step1 = 1,
  step2 = 2,
  step3 = 3,
}

@Component({
  selector: 'app-new-announcement',
  templateUrl: './new-announcement.component.html',
  styleUrls: ['./new-announcement.component.css']
})

export class NewAnnouncementComponent {  

  productForm = new FormGroup({
    name: new FormControl('', {
    nonNullable: true
    }),
    price: new FormControl<number | undefined>(undefined, {
    nonNullable: true
    }),
    info: new FormGroup({
    category: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl('')
    })
   })





 

  step: creationStep;

  isStep1() {
    return this.step === creationStep.step1;
  }
  
  isStep2() {
    return this.step === creationStep.step2;
  }

  isStep3() {
    return this.step === creationStep.step3;
  }

  nextStep() {
    if (this.step === creationStep.step3) {
      return;
    }
    this.step++;
  }

  submitForm() {

  }

  constructor(private fb: FormBuilder) { 
    this.step = creationStep.step1;
  }
}
