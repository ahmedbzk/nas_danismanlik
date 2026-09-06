import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit {
  username = '';
  isSettingsOpen = false;
  isChanging = false;
  passwordError = '';
  passwords = { current: '', new: '', confirm: '' };
  
  private adminService = inject(AdminService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private toast = inject(ToastService);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.username = localStorage.getItem('admin_username') || 'Admin';
    }
  }

  openSettings() {
    this.isSettingsOpen = true;
    this.passwordError = '';
    this.passwords = { current: '', new: '', confirm: '' };
  }

  closeSettings() {
    this.isSettingsOpen = false;
  }

  onChangePassword() {
    if (this.passwords.new !== this.passwords.confirm) {
      this.passwordError = 'Yeni şifreler eşleşmiyor!';
      return;
    }
    
    if (this.passwords.new.length < 6) {
      this.passwordError = 'Yeni şifre en az 6 karakter olmalıdır.';
      return;
    }

    this.passwordError = '';
    this.isChanging = true;

    this.adminService.changePassword(this.passwords.current, this.passwords.new).subscribe({
      next: (res: any) => {
        this.isChanging = false;
        this.closeSettings();
        this.toast.success(res.message || 'Şifre başarıyla güncellendi.');
      },
      error: (err) => {
        this.isChanging = false;
        this.passwordError = err.error?.message || 'Şifre güncellenirken bir hata oluştu.';
      }
    });
  }

  onLogout() {
    this.adminService.logout();
    this.router.navigate(['/admin/login']);
  }
}
