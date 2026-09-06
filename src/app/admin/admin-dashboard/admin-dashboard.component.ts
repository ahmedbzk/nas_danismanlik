import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-wrapper">
      <h2>NAS Danışmanlık Admin Paneline Hoş Geldiniz</h2>
      <p>Sol taraftaki menüyü kullanarak gelen iletişim taleplerini okuyabilir ve e-bülten abonelerini görebilirsiniz.</p>
    </div>
  `,
  styles: [`
    .dashboard-wrapper {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      
      h2 { color: #0a2558; margin-top: 0; }
      p { color: #555; font-size: 1.1rem; line-height: 1.6; }
    }
  `]
})
export class AdminDashboardComponent {
}
