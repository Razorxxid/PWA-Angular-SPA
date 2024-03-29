import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-register-step1',
    templateUrl: './register-step1.component.html',
    styleUrls: ['./register-step1.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, RouterLink]
})
export class RegisterStep1Component {

}
