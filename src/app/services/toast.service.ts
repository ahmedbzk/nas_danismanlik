import { Injectable, signal, inject } from '@angular/core';
import { TranslationService } from '../i18n/translation.service';

export interface Toast {
  id: number;
  type: 'success' | 'error';
  title: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<Toast[]>([]);
  private counter = 0;
  private translationService = inject(TranslationService);

  show(type: 'success' | 'error', title: string, message: string) {
    const id = ++this.counter;
    this.toasts.update(t => [...t, { id, type, title, message }]);
    setTimeout(() => this.remove(id), 4500);
  }

  remove(id: number) {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }

  success(message: string, customTitle?: string) {
    const title = customTitle || (this.translationService.translate('alerts.successTitle') as string) || 'Başarılı!';
    this.show('success', title, message);
  }

  error(message: string, customTitle?: string) {
    const title = customTitle || (this.translationService.translate('alerts.errorTitle') as string) || 'Hata!';
    this.show('error', title, message);
  }
}
