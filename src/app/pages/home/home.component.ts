import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit, PLATFORM_ID, Inject, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { TranslationService } from '../../i18n/translation.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  public translationService = inject(TranslationService);
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private toast = inject(ToastService);

  get slides() { return this.translationService.translate('home.slides'); }
  get testimonials() { return this.translationService.translate('home.testimonials'); }
  get services() { return this.translationService.translate('home.services.items'); }
  get faqsData() { return this.translationService.translate('home.faqs'); }

  currentSlideIndex = 0;
  slideInterval: any;
  private observer: IntersectionObserver | null = null;

  stats = [
    { id: 1, value: 20, suffix: '+', current: 0 },
    { id: 2, value: 150, suffix: '+', current: 0 },
    { id: 3, value: 50, suffix: '+', current: 0 },
    { id: 4, value: 100, suffix: '%', current: 0 }
  ];
  statsAnimated = false;
  faqsState = [false, false, false, false, false];

  isSubmitting = false;

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const formData = {
      ...this.contactForm.value,
      subject: 'Anasayfa İletişim Formu'
    };

    this.contactService.sendEmail(formData as any).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.contactForm.reset();
        this.toast.success(this.translationService.translate('alerts.contactSuccess') as string);
      },
      error: () => {
        this.isSubmitting = false;
        this.toast.error(this.translationService.translate('alerts.contactError') as string);
      }
    });
  }
  
  toggleFaq(index: number) {
    this.faqsState[index] = !this.faqsState[index];
  }

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startSlider();
    }
  }
  
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }
  
  setupIntersectionObserver() {
    if (typeof IntersectionObserver === 'undefined') return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          if (entry.target.classList.contains('stats-trigger') && !this.statsAnimated) {
            this.animateStats();
            this.statsAnimated = true;
          }
        }
      });
    }, options);
    
    
    setTimeout(() => {
      const elements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
      elements.forEach((el: any) => this.observer?.observe(el));
      
      const statsEl = this.elementRef.nativeElement.querySelector('.stats-trigger');
      if (statsEl) this.observer?.observe(statsEl);
    }, 100);
  }
  
  animateStats() {
    this.stats.forEach(stat => {
      const duration = 2000;
      const steps = 50;
      const stepValue = stat.value / steps;
      const stepTime = duration / steps;
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        stat.current = Math.min(Math.floor(stepValue * currentStep), stat.value);
        if (currentStep >= steps) {
          stat.current = stat.value;
          clearInterval(interval);
        }
      }, stepTime);
    });
  }

  startSlider() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 6000); 
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlideIndex = index;
    
    clearInterval(this.slideInterval);
    if (isPlatformBrowser(this.platformId)) {
      this.startSlider();
    }
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
