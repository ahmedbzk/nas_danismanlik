import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TR } from './tr';
import { EN } from './en';

export type Language = 'tr' | 'en';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly STORAGE_KEY = 'nas_lang';
  private platformId = inject(PLATFORM_ID);
  
  public currentLang = signal<Language>('tr');

  constructor() {
    this.initLanguage();
  }

  private initLanguage() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem(this.STORAGE_KEY) as Language;
      if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
        this.currentLang.set(savedLang);
      }
    }
  }

  public setLanguage(lang: Language) {
    this.currentLang.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, lang);
    }
  }

  public get activeDict() {
    return this.currentLang() === 'en' ? EN : TR;
  }

  // Nested key resolver: 'header.home' -> 'Anasayfa'
  public translate(key: string): any {
    const keys = key.split('.');
    let current: any = this.activeDict;
    
    for (const k of keys) {
      if (current[k] === undefined) {
        return key; // Fallback to key if not found
      }
      current = current[k];
    }
    
    return current;
  }
}
