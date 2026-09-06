import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy, inject } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeroComponent, TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  public translationService = inject(TranslationService);
  
  @ViewChild('statsSection') statsSection!: ElementRef;
  
  stats = [
    { id: 1, target: 15, current: 0, suffix: '+' },
    { id: 2, target: 250, current: 0, suffix: '+' },
    { id: 3, target: 50, current: 0, suffix: '+' }
  ];
  
  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !this.hasAnimated) {
          this.animateStats();
          this.hasAnimated = true;
        }
      }, { threshold: 0.5 });
      
      if (this.statsSection) {
        this.observer.observe(this.statsSection.nativeElement);
      }
    } else {
      this.animateStats(); 
    }
  }

  animateStats() {
    this.stats.forEach(stat => {
      const duration = 2000;
      const steps = 60;
      const stepValue = stat.target / steps;
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        stat.current = Math.min(Math.floor(currentStep * stepValue), stat.target);
        if (currentStep >= steps) {
          stat.current = stat.target;
          clearInterval(interval);
        }
      }, duration / steps);
    });
  }
  
  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

