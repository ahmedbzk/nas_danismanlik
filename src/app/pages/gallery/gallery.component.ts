import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [HeroComponent, TranslatePipe],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

}
