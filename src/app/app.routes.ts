import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CorporateComponent } from './pages/corporate/corporate.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AboutComponent } from './pages/about/about.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ReferencesComponent } from './pages/references/references.component';

import { AvmKiralamaComponent } from './pages/services/avm-kiralama/avm-kiralama.component';
import { MarkaYatirimComponent } from './pages/services/marka-yatirim/marka-yatirim.component';
import { BayiFranchiseComponent } from './pages/services/bayi-franchise/bayi-franchise.component';
import { ToptanSatisComponent } from './pages/services/toptan-satis/toptan-satis.component';
import { KoleksiyonTasarimComponent } from './pages/services/koleksiyon-tasarim/koleksiyon-tasarim.component';
import { ProjeCizimiComponent } from './pages/services/proje-cizimi/proje-cizimi.component';
import { GorselDanismanlikComponent } from './pages/services/gorsel-danismanlik/gorsel-danismanlik.component';
import { InsanKaynaklariComponent } from './pages/services/insan-kaynaklari/insan-kaynaklari.component';
import { ItAltyapiComponent } from './pages/services/it-altyapi/it-altyapi.component';

import { GizlilikPolitikasiComponent } from './components/gizlilik-politikasi/gizlilik-politikasi.component';
import { KullaniciSozlesmesiComponent } from './components/kullanici-sozlesmesi/kullanici-sozlesmesi.component';

import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminContactsComponent } from './admin/admin-contacts/admin-contacts.component';
import { AdminSubscribersComponent } from './admin/admin-subscribers/admin-subscribers.component';
import { adminAuthGuard } from './guards/admin-auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'kurumsal', component: CorporateComponent },
  { path: 'kurumsal/hakkimizda', component: AboutComponent },
  { path: 'kurumsal/sss', component: FaqComponent },
  { path: 'kurumsal/referanslar', component: ReferencesComponent },
  { path: 'hizmetler/avm-kiralama', component: AvmKiralamaComponent },
  { path: 'hizmetler/marka-yatirim', component: MarkaYatirimComponent },
  { path: 'hizmetler/bayi-franchise', component: BayiFranchiseComponent },
  { path: 'hizmetler/toptan-satis', component: ToptanSatisComponent },
  { path: 'hizmetler/koleksiyon-tasarim', component: KoleksiyonTasarimComponent },
  { path: 'hizmetler/proje-cizimi', component: ProjeCizimiComponent },
  { path: 'hizmetler/gorsel-danismanlik', component: GorselDanismanlikComponent },
  { path: 'hizmetler/insan-kaynaklari', component: InsanKaynaklariComponent },
  { path: 'hizmetler/it-altyapi', component: ItAltyapiComponent },
  { path: 'galeri', component: GalleryComponent },
  { path: 'iletisim', component: ContactComponent },
  { path: 'gizlilik-politikasi', component: GizlilikPolitikasiComponent },
  { path: 'kullanici-sozlesmesi', component: KullaniciSozlesmesiComponent },
  
  // Admin Routes
  { path: 'admin/login', component: AdminLoginComponent },
  { 
    path: 'admin', 
    component: AdminLayoutComponent,
    canActivate: [adminAuthGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'contacts', component: AdminContactsComponent },
      { path: 'subscribers', component: AdminSubscribersComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];
