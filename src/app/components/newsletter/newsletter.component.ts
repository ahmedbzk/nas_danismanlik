import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { ContactService } from '../../services/contact.service';
import { ToastService } from '../../services/toast.service';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss'
})
export class NewsletterComponent {
  email = '';
  isSubmitting = false;

  private contactService = inject(ContactService);
  private toast = inject(ToastService);

  private translation = inject(TranslationService);

  onSubmit() {
    if (!this.email) return;
    
    this.isSubmitting = true;

    this.contactService.subscribeNewsletter(this.email).subscribe({
      next: (res) => {
        this.toast.success(this.translation.translate('newsletter.success') as string);
        this.email = '';
        this.isSubmitting = false;
      },
      error: (err) => {
        if (err.status === 409) {
          const infoTitle = this.translation.translate('alerts.infoTitle') as string || 'Bilgi';
          this.toast.show('success', infoTitle, this.translation.translate('newsletter.exists') as string);
        } else {
          this.toast.error(this.translation.translate('newsletter.error') as string);
        }
        this.isSubmitting = false;
      }
    });
  }
}
