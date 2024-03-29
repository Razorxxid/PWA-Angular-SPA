import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BackButtonServiceService } from 'src/app/services/back-button-service.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(private backButton: BackButtonServiceService) {


  }

  BackButton() {
    this.backButton.OnBackButton();
  }
}
