import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { TranslationService } from '../../i18n/translation.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, HeroComponent, TranslatePipe, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private translationService = inject(TranslationService);
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private toast = inject(ToastService);

  isSubmitting = false;

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  err(field: string): string {
    const ctrl = this.contactForm.get(field);
    if (!ctrl || !ctrl.touched || ctrl.valid) return '';
    const v = this.translationService.translate('contact.validation') as any;
    if (field === 'name' && ctrl.errors?.['required']) return v.nameRequired;
    if (field === 'email' && ctrl.errors?.['required']) return v.emailRequired;
    if (field === 'email' && ctrl.errors?.['email']) return v.emailInvalid;
    if (field === 'subject' && ctrl.errors?.['required']) return v.subjectRequired;
    if (field === 'message' && ctrl.errors?.['required']) return v.messageRequired;
    if (field === 'message' && ctrl.errors?.['minlength']) return v.messageMin;
    return '';
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.contactService.sendEmail(this.contactForm.value as any).subscribe({
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
}

