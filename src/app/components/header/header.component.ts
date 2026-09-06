import { Component, HostListener, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { TranslationService, Language } from '../../i18n/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeDropdown: string | null = null;
  
  private translationService = inject(TranslationService);
  public lang = this.translationService.currentLang;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      this.activeDropdown = null; 
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
    this.activeDropdown = null;
  }

  toggleDropdown(menu: string) {
    if (window.innerWidth <= 991) {
      this.activeDropdown = this.activeDropdown === menu ? null : menu;
    }
  }

  setLang(l: Language) {
    this.translationService.setLanguage(l);
  }
}
