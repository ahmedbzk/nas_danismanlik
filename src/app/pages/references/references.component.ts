import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [HeroComponent, TranslatePipe],
  template: `
    <app-hero [title]="'referencesPage.hero.title' | translate" [subtitle]="'referencesPage.hero.subtitle' | translate"></app-hero>
    <div class="page-padding container">
      
      <div class="text-center mb-5">
        <p class="desc">{{ 'referencesPage.desc' | translate }}</p>
      </div>
      <div class="ref-grid">
        <div class="ref-card has-badge"><span class="franchise-badge">Franchise - {{ 'referencesPage.dealer' | translate }}</span><img src="assets/marka/Koton.png" alt="Koton"></div>
        <div class="ref-card"><img src="assets/marka/LakeTown.jpeg" alt="LakeTown"></div>
        <div class="ref-card has-badge"><span class="franchise-badge">Franchise - {{ 'referencesPage.dealer' | translate }}</span><img src="assets/marka/Mavi.png" alt="Mavi"></div>
        <div class="ref-card"><img src="assets/marka/Sofuoglu.jpeg" alt="Sofuoglu"></div>
        <div class="ref-card"><img src="assets/marka/markamarkalogo.svg" alt="Markamarka"></div>
        <div class="ref-card"><img src="assets/marka/smart_play.jpeg" alt="Smart Play"></div>
        <div class="ref-card"><img src="assets/marka/tmr_octabay.jpg" alt="TMR Octa Bay"></div>
      </div>

      <div class="projects-section">
        <div class="section-header">
          <h2 class="section-title">{{ 'referencesPage.projects.title' | translate }}</h2>
          <div class="title-line center"></div>
          <p class="desc">{{ 'referencesPage.projects.desc' | translate }}</p>
        </div>
        
        <div class="projects-grid">
          <div class="project-card featured-project">
            <a href="assets/pdfs/tmr-octabay-candarli-proje-gorselleri.pdf" target="_blank" rel="noopener noreferrer" class="project-img-link" title="{{ 'referencesPage.inspectDetail' | translate }}">
              <div class="project-img">
                <img src="assets/marka/tmr_octabay_izmir.jpeg" alt="TMR Octa Bay İzmir Çandarlı">
              </div>
            </a>
            <div class="project-info">
              <h4>TMR Octa Bay / {{ 'referencesPage.villaProject' | translate }}</h4>
              <p><i class="icon-map-pin"></i> İzmir / Çandarlı</p>
              <div class="project-actions">
                <a href="assets/pdfs/tmr-octabay-candarli-proje-gorselleri.pdf" target="_blank" rel="noopener noreferrer" class="btn-detail-blue">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                  <span>{{ 'referencesPage.inspectDetail' | translate }}</span>
                  <svg class="external-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div class="project-card">
            <div class="project-img"><img src="assets/marka/mut_koton.jpeg" alt="Koton Mut"></div>
            <div class="project-info">
              <h4>Koton / {{ 'referencesPage.franchiseDealer' | translate }}</h4>
              <p><i class="icon-map-pin"></i> Mersin / Mut</p>
            </div>
          </div>
          
          <div class="project-card">
            <div class="project-img"><img src="assets/marka/anamur_koton.jpeg" alt="Koton Anamur"></div>
            <div class="project-info">
              <h4>Koton / {{ 'referencesPage.franchiseDealer' | translate }}</h4>
              <p><i class="icon-map-pin"></i> Mersin / Anamur</p>
            </div>
          </div>
          
          <div class="project-card">
            <div class="project-img"><img src="assets/marka/mavi_tasucu.jpeg" alt="Mavi Taşucu"></div>
            <div class="project-info">
              <h4>Mavi / {{ 'referencesPage.franchiseDealer' | translate }}</h4>
              <p><i class="icon-map-pin"></i> Mersin / Taşucu</p>
            </div>
          </div>
          
          <div class="project-card">
            <div class="project-img"><img src="assets/marka/silifke_koton1.jpeg" alt="Koton Silifke"></div>
            <div class="project-info">
              <h4>Koton / {{ 'referencesPage.franchiseDealer' | translate }}</h4>
              <p><i class="icon-map-pin"></i> Mersin / Silifke</p>
            </div>
          </div>
          
          <div class="project-card">
            <div class="project-img"><img src="assets/marka/silifke_marka.jpeg" alt="Markamarka Silifke"></div>
            <div class="project-info">
              <h4>Markamarka</h4>
              <p><i class="icon-map-pin"></i> Mersin / Silifke</p>
            </div>
          </div>
          
          <div class="project-card">
            <div class="project-img"><img src="assets/marka/silifke_koton2.jpeg" alt="Koton Silifke Ek"></div>
            <div class="project-info">
              <h4>Koton / {{ 'referencesPage.franchiseDealer' | translate }}</h4>
              <p><i class="icon-map-pin"></i> Mersin / Silifke</p>
            </div>
          </div>

          <div class="project-card">
            <div class="project-img"><img src="assets/marka/unye_koton.jpeg" alt="Koton Ünye"></div>
            <div class="project-info">
              <h4>Koton / {{ 'referencesPage.franchiseDealer' | translate }}</h4>
              <p><i class="icon-map-pin"></i> Ordu / Ünye</p>
            </div>
          </div>

          <div class="project-card">
            <div class="project-img"><img src="assets/marka/tatvan_koton.jpeg" alt="Koton Tatvan"></div>
            <div class="project-info">
              <h4>Koton / {{ 'referencesPage.franchiseDealer' | translate }}</h4>
              <p><i class="icon-map-pin"></i> Bitlis / Tatvan</p>
            </div>
          </div>

          <div class="project-card">
            <div class="project-img"><img src="assets/marka/cadde_merkez_igdir.jpeg" alt="Cadde Merkez İğdir"></div>
            <div class="project-info">
              <h4>Koton / {{ 'referencesPage.franchiseDealer' | translate }}</h4>
              <p><i class="icon-map-pin"></i> Iğdır / Merkez</p>
            </div>
          </div>

          <div class="project-card">
            <div class="project-img"><img src="assets/marka/Balıkesir Avlu-Smart_Play.jpeg" alt="Smart Play Balıkesir Avlu"></div>
            <div class="project-info">
              <h4>Smart Play</h4>
              <p><i class="icon-map-pin"></i> Balıkesir / Avlu AVM</p>
            </div>
          </div>

          <div class="project-card">
            <div class="project-img"><img src="assets/marka/Bursa Korupark-Smart_Play.jpeg" alt="Smart Play Bursa Korupark"></div>
            <div class="project-info">
              <h4>Smart Play</h4>
              <p><i class="icon-map-pin"></i> Bursa / Korupark AVM</p>
            </div>
          </div>

          <div class="project-card">
            <div class="project-img"><img src="assets/marka/City's Kozyatağı AVM-Smart_Play.jpeg" alt="Smart Play City's Kozyatağı"></div>
            <div class="project-info">
              <h4>Smart Play</h4>
              <p><i class="icon-map-pin"></i> İstanbul / City's Kozyatağı AVM</p>
            </div>
          </div>

          <div class="project-card">
            <div class="project-img"><img src="assets/marka/Izmir Park Bornova-Smart_Play.jpeg" alt="Smart Play İzmir Park Bornova"></div>
            <div class="project-info">
              <h4>Smart Play</h4>
              <p><i class="icon-map-pin"></i> İzmir / Park Bornova AVM</p>
            </div>
          </div>

          <div class="project-card">
            <div class="project-img"><img src="assets/marka/Kesan Bendis AVM-Smart_Play.jpeg" alt="Smart Play Keşan Bendis"></div>
            <div class="project-info">
              <h4>Smart Play</h4>
              <p><i class="icon-map-pin"></i> Edirne / Keşan Bendis AVM</p>
            </div>
          </div>

          <div class="project-card">
            <div class="project-img"><img src="assets/marka/Mall of İstanbul-Smart_Play.jpeg" alt="Smart Play Mall of İstanbul"></div>
            <div class="project-info">
              <h4>Smart Play</h4>
              <p><i class="icon-map-pin"></i> İstanbul / Mall of İstanbul</p>
            </div>
          </div>

          <div class="project-card">
            <div class="project-img"><img src="assets/marka/Torıum AVM-Smart_Play.jpeg" alt="Smart Play Torium AVM"></div>
            <div class="project-info">
              <h4>Smart Play</h4>
              <p><i class="icon-map-pin"></i> İstanbul / Torium AVM</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .text-center { text-align: center; }
    .mb-5 { margin-bottom: 40px; }
    .desc { color: var(--color-text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto; line-height: 1.6; }
    .page-padding { padding-bottom: 100px; margin-bottom: 50px; }
    
    .ref-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; margin-bottom: 80px; }
    .ref-card { width: calc(50% - 15px); position: relative; background: white; border-radius: 12px; padding: 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: all 0.3s ease; border: 1px solid rgba(0,0,0,0.05); height: 140px; overflow: hidden; }
    @media (min-width: 768px) { .ref-card { width: calc(33.333% - 20px); } }
    @media (min-width: 992px) { .ref-card { width: calc(20% - 24px); } }
    .ref-card img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 6px; }
    .ref-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    .franchise-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: linear-gradient(135deg, rgba(10, 37, 88, 0.82) 0%, rgba(6, 22, 56, 0.70) 100%);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border: 1px solid rgba(255,255,255,0.18);
      color: #fff;
      font-size: 0.62rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 6px;
      pointer-events: none;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(6,22,56,0.18);
    }
    
    /* Projects Section */
    .projects-section { margin-top: 60px; padding-top: 40px; border-top: 1px solid #eee; }
    .section-header { text-align: center; margin-bottom: 50px; }
    .section-title { font-size: 2.2rem; color: var(--color-primary); margin-bottom: 15px; font-weight: 700; }
    .title-line { width: 60px; height: 4px; background: var(--color-secondary); margin-bottom: 25px; border-radius: 2px; }
    .title-line.center { margin: 0 auto 25px; }
    
    .projects-grid { display: grid; grid-template-columns: 1fr; gap: 30px; }
    @media (min-width: 768px) { .projects-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 992px) { .projects-grid { grid-template-columns: repeat(3, 1fr); } }
    
    .project-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.06); transition: all 0.3s ease; border: 1px solid rgba(0,0,0,0.03); display: flex; flex-direction: column; }
    .project-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,0,0,0.12); }
    .project-card.featured-project { border: 1px solid rgba(10, 37, 88, 0.12); }
    .project-img-link { display: block; position: relative; text-decoration: none; cursor: pointer; }
    .project-img { width: 100%; height: 220px; overflow: hidden; position: relative; }
    .project-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .project-card:hover .project-img img { transform: scale(1.05); }
    
    .type-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background: linear-gradient(135deg, rgba(10, 37, 88, 0.92) 0%, rgba(6, 22, 56, 0.82) 100%);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border: 1px solid rgba(255,255,255,0.22);
      color: #fff;
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      pointer-events: none;
      z-index: 2;
    }
    
    .project-info { padding: 25px 20px; text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
    .project-info h4 { margin: 0 0 10px 0; font-size: 1.3rem; color: var(--color-primary); font-weight: 600; }
    .project-info p { margin: 0; color: #666; font-size: 1.05rem; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .project-actions { margin-top: 16px; display: flex; justify-content: center; }
    .btn-detail-blue {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #0b4db7 !important;
      background: #f0f5ff;
      border: 1px solid #c7d9fc;
      padding: 8px 20px;
      border-radius: 50px;
      font-size: 0.92rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.25s ease;
      box-shadow: 0 2px 6px rgba(11, 77, 183, 0.08);
      cursor: pointer;
    }
    .btn-detail-blue:hover {
      background: #0b4db7;
      color: #ffffff !important;
      border-color: #0b4db7;
      transform: translateY(-2px);
      box-shadow: 0 4px 14px rgba(11, 77, 183, 0.25);
    }
    .btn-detail-blue svg { stroke: currentColor; flex-shrink: 0; transition: transform 0.2s ease; }
    .btn-detail-blue:hover .external-icon { transform: translate(2px, -2px); }
    .icon-map-pin { display: inline-block; width: 16px; height: 16px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23e81d2a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E"); background-size: cover; }
  `]
})
export class ReferencesComponent {

}
