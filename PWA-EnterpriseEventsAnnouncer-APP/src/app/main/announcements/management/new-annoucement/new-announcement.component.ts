import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Step3Component } from './step3/step3.component';
import { Step2Component } from './step2/step2.component';
import { Step1Component } from './step1/step1.component';
import { NgIf } from '@angular/common';
import { SendAnnouncementDto } from 'src/app/viewmodels/sendAnnoucementDto';

enum creationStep {
  step1 = 1,
  step2 = 2,
  step3 = 3,
}

@Component({
    selector: 'app-new-announcement',
    templateUrl: './new-announcement.component.html',
    styleUrls: ['./new-announcement.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, NgIf, Step1Component, Step2Component, Step3Component]
})

export class NewAnnouncementComponent {  



  receiveForm: SendAnnouncementDto = new SendAnnouncementDto('', '', '', []);
 
  step2Confirmation: boolean = false;

  step: creationStep;


  receiveFormFromStep1($event: SendAnnouncementDto) {

    this.receiveForm.title = $event.title;
    this.receiveForm.text = $event.text;
    this.receiveForm.imageUrl = $event.imageUrl;
    this.receiveForm.destinationGroupsIds = $event.destinationGroupsIds;
    this.nextStep();
  }

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

  completeStep2($event: boolean) 
  {
    this.step2Confirmation = $event;
    this.nextStep();

  }

  constructor(private fb: FormBuilder) { 
    this.step = creationStep.step1;
  }
}
