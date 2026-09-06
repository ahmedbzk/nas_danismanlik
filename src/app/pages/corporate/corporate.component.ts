import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-corporate',
  standalone: true,
  imports: [HeroComponent],
  templateUrl: './corporate.component.html',
  styleUrl: './corporate.component.scss'
})
export class CorporateComponent {

}
