import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-register-step3',
    templateUrl: './register-step3.component.html',
    styleUrls: ['./register-step3.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, RouterLink]
})
export class RegisterStep3Component {

}
