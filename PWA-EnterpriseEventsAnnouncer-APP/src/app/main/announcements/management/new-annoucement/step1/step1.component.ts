import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { SendAnnouncementDto } from 'src/app/viewmodels/sendAnnoucementDto';

@Component({
    selector: 'app-step1',
    templateUrl: './step1.component.html',
    styleUrls: ['./step1.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule]
})

export class Step1Component {
  
  public formgroupStep1: FormGroup;
  @Output() nextStep = new EventEmitter<SendAnnouncementDto>();

  constructor(private formBuilder: FormBuilder) { 
    this.formgroupStep1 = this.formBuilder.group({

      title: new FormControl(''),
      text: new FormControl(''),
      imageUrl: new FormControl(''),
    });

  }
  ngOnInit(): void {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      this.formgroupStep1.patchValue(JSON.parse(savedData));
    }

    // Escucha los cambios en el formulario y guarda los datos en el almacenamiento local
    this.formgroupStep1.valueChanges.subscribe(value => {
      localStorage.setItem('formData', JSON.stringify(value));
    });

  }


  
  OnSubmit() {
    let annoucementStep1 = new SendAnnouncementDto(this.formgroupStep1.value.title, 
      this.formgroupStep1.value.text, this.formgroupStep1.value.imageUrl, []);

    this.nextStep.emit(annoucementStep1);
  }

}
