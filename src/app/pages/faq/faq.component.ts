import { Component, inject } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [HeroComponent, CommonModule, TranslatePipe],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  public translationService = inject(TranslationService);
  
  get faqsData() {
    return this.translationService.translate('faqPage.faqs');
  }

  faqsState = Array(10).fill(false);

  toggleFaq(index: number): void {
    this.faqsState[index] = !this.faqsState[index];
  }
}
