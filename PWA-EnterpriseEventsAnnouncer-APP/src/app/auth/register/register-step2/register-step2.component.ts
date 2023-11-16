import { Component } from '@angular/core';


@Component({
  selector: 'app-register-step2',
  templateUrl: './register-step2.component.html',
  styleUrls: ['./register-step2.component.css']
})
export class RegisterStep2Component {
  fechaNacimiento: string = '';

  guardarFecha() {
    console.log('Fecha de nacimiento seleccionada:', this.fechaNacimiento);
    // Puedes agregar aquí la lógica para guardar la fecha en tu base de datos o realizar otras acciones.
  }
}
