import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { TranslationService } from '../../i18n/translation.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-sidebar-contact',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ReactiveFormsModule],
  templateUrl: './sidebar-contact.component.html',
  styleUrls: ['./sidebar-contact.component.scss']
})
export class SidebarContactComponent {
  @Input() pageTitle: string = 'Hizmetler';

  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private toast = inject(ToastService);
  private t = inject(TranslationService);

  isSubmitting = false;

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  err(field: string): string {
    const ctrl = this.contactForm.get(field);
    if (!ctrl || !ctrl.touched || ctrl.valid) return '';
    const v = this.t.translate('services.sidebarContact.validation') as any;
    if (field === 'name' && ctrl.errors?.['required']) return v.nameRequired;
    if (field === 'email' && ctrl.errors?.['required']) return v.emailRequired;
    if (field === 'email' && ctrl.errors?.['email']) return v.emailInvalid;
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

    const formData = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      subject: this.pageTitle + ' Bilgi Talebi',
      message: this.contactForm.value.message
    };

    this.contactService.sendEmail(formData as any).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.contactForm.reset();
        this.toast.success('Mesajınız başarıyla gönderildi.');
      },
      error: () => {
        this.isSubmitting = false;
        this.toast.error('Gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    });
  }
}
