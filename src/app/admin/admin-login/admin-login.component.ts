import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  username = '';
  password = '';
  isLoading = false;

  private adminService = inject(AdminService);
  private router = inject(Router);
  private toast = inject(ToastService);

  errorMessage = '';

  onLogin() {
    if (!this.username || !this.password) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.adminService.login(this.username, this.password).subscribe({
      next: () => {
        this.toast.success('Giriş başarılı. Yönlendiriliyorsunuz...');
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 1000);
      },
      error: (err) => {
        this.isLoading = false;
        
        // Eğer sunucu PHP dosyasını ham metin olarak döndürdüyse (ng serve nedeniyle)
        if (err.name === 'HttpErrorResponse' && err.error instanceof SyntaxError || (typeof err.error === 'string' && err.error.includes('<?php'))) {
          this.errorMessage = 'Giriş sistemi şu anda kullanılamıyor. Lütfen uygulamayı XAMPP üzerinden çalıştırın (ng serve ile PHP çalışmaz).';
        } else if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Kullanıcı adı veya şifre hatalı!';
        }
        
        this.toast.error(this.errorMessage);
      }
    });
  }
}
