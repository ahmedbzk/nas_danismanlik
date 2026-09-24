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
  
  teamImages = ['assets/marka/ekip1.png', 'assets/marka/ekip2.png'];
  currentImageIndex = 0;
  currentTeamImage = this.teamImages[0];
  private imageInterval: any;
  isFading = false;

  ngOnInit(): void {
    this.startImageInterval();
  }

  startImageInterval() {
    if (this.imageInterval) {
      clearInterval(this.imageInterval);
    }
    this.imageInterval = setInterval(() => {
      this.setTeamImage((this.currentImageIndex + 1) % this.teamImages.length);
    }, 10000);
  }

  setTeamImage(index: number) {
    if (this.currentImageIndex === index) return;
    
    this.isFading = true;
    
    setTimeout(() => {
      this.currentImageIndex = index;
      this.currentTeamImage = this.teamImages[index];
      this.isFading = false;
    }, 300);
    
    this.startImageInterval(); // Reset timer when clicked manually
  }

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
    if (this.imageInterval) {
      clearInterval(this.imageInterval);
    }
  }
}

