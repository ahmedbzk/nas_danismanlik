import { Injectable, inject, effect } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { TranslationService } from '../i18n/translation.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);
  private translationService = inject(TranslationService);

  private currentPath = '';

  constructor() {
    effect(() => {
      this.translationService.currentLang(); // Track language changes
      this.updateMetadata();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentPath = event.urlAfterRedirects;
      this.updateMetadata();
    });
  }

  private getRouteKey(path: string): string {
    // URL'den olası query veya fragmentleri temizle
    const cleanPath = path.split('?')[0].split('#')[0];
    
    const routeMap: Record<string, string> = {
      '/': 'home',
      '/kurumsal': 'corporate',
      '/kurumsal/hakkimizda': 'about',
      '/kurumsal/sss': 'faq',
      '/kurumsal/referanslar': 'references',
      '/galeri': 'gallery',
      '/iletisim': 'contact',
      '/gizlilik-politikasi': 'privacy',
      '/kullanici-sozlesmesi': 'terms',
      '/hizmetler/avm-kiralama': 'services_avm',
      '/hizmetler/marka-yatirim': 'services_brand',
      '/hizmetler/bayi-franchise': 'services_franchise',
      '/hizmetler/toptan-satis': 'services_wholesale',
      '/hizmetler/koleksiyon-tasarim': 'services_design',
      '/hizmetler/proje-cizimi': 'services_project',
      '/hizmetler/gorsel-danismanlik': 'services_visual',
      '/hizmetler/insan-kaynaklari': 'services_hr',
      '/hizmetler/it-altyapi': 'services_it'
    };

    return routeMap[cleanPath] || 'default';
  }

  updateMetadata() {
    const key = this.getRouteKey(this.currentPath);

    const title = this.translationService.translate(`seo.${key}.title`) as string;
    const description = this.translationService.translate(`seo.${key}.description`) as string;

    if (title && title !== `seo.${key}.title`) {
      this.titleService.setTitle(title);
    } else {
      // Fallback
      this.titleService.setTitle(this.translationService.translate('seo.default.title') as string);
    }
    
    if (description && description !== `seo.${key}.description`) {
      this.metaService.updateTag({ name: 'description', content: description });
      this.metaService.updateTag({ property: 'og:description', content: description });
    }
  }
}
