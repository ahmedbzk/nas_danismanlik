import { Component, inject } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SocialFabComponent } from './components/social-fab/social-fab.component';
import { ToastComponent } from './components/toast/toast.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { filter } from 'rxjs/operators';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SocialFabComponent, ToastComponent, NewsletterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'nas-danismanlik';
  isHomePage = true;
  isAdminRoute = false;
  private router = inject(Router);
  private seoService = inject(SeoService);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isHomePage = event.urlAfterRedirects === '/';
      this.isAdminRoute = event.urlAfterRedirects.startsWith('/admin');
    });
  }
}
