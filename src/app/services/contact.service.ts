import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);
  // Production URL for the PHP script inside the assets folder
  private apiUrl = 'assets/api/contact.php';
  private subscribeUrl = 'assets/api/subscribe.php';

  sendEmail(data: ContactForm): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  subscribeNewsletter(email: string): Observable<any> {
    return this.http.post(this.subscribeUrl, { email });
  }
}
