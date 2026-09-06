import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin/admin.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-admin-subscribers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-subscribers.component.html',
  styleUrl: '../admin-contacts/admin-contacts.component.scss' // Reusing styles from contacts
})
export class AdminSubscribersComponent implements OnInit {
  subscribers: any[] = [];
  isLoading = true;

  private adminService = inject(AdminService);
  private toast = inject(ToastService);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.adminService.getSubscribers().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.subscribers = res.data;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.toast.error('Veriler yüklenirken hata oluştu.');
        this.isLoading = false;
      }
    });
  }

  deleteItem(id: number) {
    if (confirm('Bu aboneyi silmek istediğinize emin misiniz?')) {
      this.adminService.deleteItem('subscribers', id).subscribe({
        next: () => {
          this.toast.success('Kayıt başarıyla silindi.');
          this.loadData();
        },
        error: () => {
          this.toast.error('Silme işlemi başarısız oldu.');
        }
      });
    }
  }
}
