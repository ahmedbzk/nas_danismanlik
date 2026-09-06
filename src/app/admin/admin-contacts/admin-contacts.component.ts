import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin/admin.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-admin-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-contacts.component.html',
  styleUrl: './admin-contacts.component.scss'
})
export class AdminContactsComponent implements OnInit {
  contacts: any[] = [];
  isLoading = true;

  private adminService = inject(AdminService);
  private toast = inject(ToastService);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.adminService.getContacts().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.contacts = res.data;
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
    if (confirm('Bu iletişim talebini silmek istediğinize emin misiniz?')) {
      this.adminService.deleteItem('contacts', id).subscribe({
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
