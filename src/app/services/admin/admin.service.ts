import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  
  private loginUrl = 'assets/api/admin-login.php';
  private dataUrl = 'assets/api/admin-data.php';

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { username, password }).pipe(
      tap((res: any) => {
        if (res && res.token) {
          localStorage.setItem('admin_token', res.token);
          localStorage.setItem('admin_username', res.username);
        }
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_username');
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('admin_token');
    }
    return false;
  }

  getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('admin_token') || '';
    }
    return '';
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': this.getToken()
      })
    };
  }

  getContacts(): Observable<any> {
    return this.http.get(`${this.dataUrl}?type=contacts`, this.getHeaders());
  }

  getMessages(): Observable<any> {
    return this.http.get(`${this.dataUrl}?type=messages`, this.getHeaders());
  }

  getSubscribers(): Observable<any> {
    return this.http.get(`${this.dataUrl}?type=subscribers`, this.getHeaders());
  }

  changePassword(current_password: string, new_password: string): Observable<any> {
    const body = { current_password, new_password };
    return this.http.post('assets/api/change-password.php', body, this.getHeaders());
  }

  deleteItem(type: 'contacts' | 'subscribers', id: number): Observable<any> {
    return this.http.delete(`${this.dataUrl}?type=${type}&id=${id}`, this.getHeaders());
  }
}
