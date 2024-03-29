import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-management',
    templateUrl: './management.component.html',
    styleUrls: ['./management.component.css'],
    standalone: true,
    imports: [RouterLink, RouterOutlet]
})
export class ManagementComponent {

}
