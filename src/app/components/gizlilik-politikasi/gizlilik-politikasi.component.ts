import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'app-gizlilik-politikasi',
  standalone: true,
  imports: [CommonModule, TranslatePipe, HeroComponent],
  templateUrl: './gizlilik-politikasi.component.html',
  styles: [`
    .policy-container {
      max-width: 900px;
      margin: 120px auto 80px;
      padding: 0 20px;
      font-family: inherit;
      color: #333;
    }
    .policy-title {
      font-size: 2.5rem;
      color: var(--color-primary, #0a2558);
      margin-bottom: 20px;
      font-weight: 700;
    }
    .policy-content p {
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 15px;
    }
    .policy-content h3 {
      font-size: 1.5rem;
      color: var(--color-primary, #0a2558);
      margin-top: 30px;
      margin-bottom: 15px;
    }
  `]
})
export class GizlilikPolitikasiComponent {
}
