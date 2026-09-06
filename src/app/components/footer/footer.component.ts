import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SocialMediasComponent } from '../social-medias/social-medias.component';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, SocialMediasComponent, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}
