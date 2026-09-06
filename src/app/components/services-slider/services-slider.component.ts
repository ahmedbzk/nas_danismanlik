import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-services-slider',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './services-slider.component.html',
  styleUrl: './services-slider.component.scss'
})
export class ServicesSliderComponent {
  public translationService = inject(TranslationService);
  get services() { return this.translationService.translate('home.services.items'); }
}
