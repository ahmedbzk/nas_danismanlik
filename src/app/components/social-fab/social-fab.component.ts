import { Component } from '@angular/core';

@Component({
  selector: 'app-social-fab',
  standalone: true,
  imports: [],
  templateUrl: './social-fab.component.html',
  styleUrl: './social-fab.component.scss'
})
export class SocialFabComponent {
  isOpen = false;

  toggleFab() {
    this.isOpen = !this.isOpen;
  }
}
