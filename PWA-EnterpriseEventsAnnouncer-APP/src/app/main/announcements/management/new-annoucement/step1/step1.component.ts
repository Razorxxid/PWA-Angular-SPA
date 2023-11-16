import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})





@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component {
  
  @Input() formgroupStep1: FormGroup;
  @Output() nextStep = new EventEmitter<void>();

  constructor() { 
    this.formgroupStep1 = new FormGroup({
      formcontrol1: new FormControl(''),
      formcontrol2: new FormControl(''),
      formcontrol3: new FormControl(''),
    });
  }
}
