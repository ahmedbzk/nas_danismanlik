import { Component, HostListener } from '@angular/core';
import { ServicesSliderComponent } from '../../../components/services-slider/services-slider.component';
import { HeroComponent } from '../../../components/hero/hero.component';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../i18n/translate.pipe';
import { SidebarContactComponent } from '../../../components/sidebar-contact/sidebar-contact.component';

@Component({
  selector: 'app-it-altyapi',
  standalone: true,
  imports: [HeroComponent, CommonModule, TranslatePipe, ServicesSliderComponent, SidebarContactComponent],
  templateUrl: './it-altyapi.component.html',
  styleUrls: ['./it-altyapi.component.scss']
})
export class ItAltyapiComponent {
  activeSection: string = 'sec-1';
  
  scrollToSection(sectionId: string): void {
    this.activeSection = sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    const sections = ['sec-1', 'sec-2', 'sec-3', 'sec-4', 'sec-5', 'sec-6'];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 300) {
          this.activeSection = section;
          break;
        }
      }
    }
  }
}
